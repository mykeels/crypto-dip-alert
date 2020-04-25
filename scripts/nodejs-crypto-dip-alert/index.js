#!/usr/bin/env node

require('dotenv').config();
require('isomorphic-fetch');

const { program } = require('commander');
const chalk = require('chalk');

const INTERVAL_MS = 10000;
const PAGINATION_COUNT = 4;
const COINCAP_ASSETS_URL = 'https://api.coincap.io/v2/assets';

program
  .option('-c, --coins <coins>', 'A comma-separated list of coins to track', value => value.split(',').map(c => c.trim()), ['BTC', 'ETH'])
  .option('-p, --price <price>', 'A price value to monitor', '0.01')
  .option('-t, --type <type>', '"percent" or "cents"', 'percent')
  .option('-l, --list', 'List available Cryptos')
  .option('-e, --env', 'View and Edit the .env file')
  .parse(process.argv);

(async () => {
  if (program.env) {
    const fs = require('fs');
    const path = require('path');
    const openText = require('open-file-text-editor');
    const envFilePath = path.join(__dirname, '.env');
    const envSampleFilePath = path.join(__dirname, '.env.sample');
    const openEnvFile = async () => {
      try {
        await openText(envFilePath);
      }
      catch {
        console.warn(`Could not open .env file. Try any of the following commands instead:
        
        nano ${envFilePath}
        open ${envFilePath}
        notepad ${envFilePath}`);
      }
    }
    if (!fs.existsSync(envFilePath)) {
      fs.copyFileSync(envSampleFilePath, envFilePath);
    }
    await openEnvFile();
    return;
  }

  const NotificationsFactory = require('./notifications');
  const notifications = await NotificationsFactory;
  const { data: assets } = await fetch(COINCAP_ASSETS_URL).then(res => res.json());
  const assetDict = assets.reduce((obj, item) => ({
    ...obj,
    [item.symbol]: item
  }), {});


  if (program.list) {
    console.log(
      assets
        .map(({ symbol }) => symbol)
        .reduce((arr, item) => {
          if (!arr[arr.length - 1] || arr[arr.length - 1].length === PAGINATION_COUNT) {
            arr.push([item])
          }
          else {
            arr[arr.length - 1].push(item)
          }
          return arr;
        }, [])
        .map(arr => arr.join('\t'))
        .join('\n')
    );
  }
  else {
    const known = program.coins.filter(c => assetDict[c]);
    const unknown = program.coins.filter(c => !assetDict[c]);

    if (unknown.length) {
      console.log(`Unknown: ${unknown.join(', ')}`);
    }
    if (!known.length) return;

    const assetsArgs = known.map(c => assetDict[c].id);

    console.log(`
Monitoring: ${known.join(', ')}

Price Dip: ${program.price}${program.type === 'percent' ? '%' : ' cents'}
`);

    let maxPriceSinceLastDip = {};

    function dipThresholdInCents(maxPrice) {
      return program.type === 'percent' ?
        (Number(program.price) / 100 * maxPrice) :
        (program.price / 100);
    }

    async function sleep(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
      })
    }

    async function checkPrices() {

      const cryptos = await Promise.all(
        known.map(symbol => {
          const id = assetDict[symbol].id;
          return fetch(`https://api.coincap.io/v2/assets/${id}`).then(res => res.json());
        })
      );

      for (let { data: coin } of cryptos) {
        if (!maxPriceSinceLastDip[coin.symbol]) {
          maxPriceSinceLastDip[coin.symbol] = +Number(coin.priceUsd).toFixed(2);
        }

        const maxPrice = maxPriceSinceLastDip[coin.symbol];

        const currentPrice = +Number(coin.priceUsd).toFixed(2);

        const dipThreshold = +dipThresholdInCents(maxPrice).toFixed(2);

        const priceDifference = +Number(currentPrice - maxPrice).toFixed(2);

        console.log(
          `${coin.symbol}: $${currentPrice}`,
          (priceDifference > 0) ? chalk.green(`+$${priceDifference}`) : (
            (priceDifference < 0) ? chalk.red(`-$${Math.abs(priceDifference)}`) : ''
          )
        );

        if (currentPrice > maxPrice) {
          maxPriceSinceLastDip[coin.symbol] = currentPrice;
        }
        else if ((maxPrice - currentPrice) >= dipThreshold) {
          await notifications.map(fn => fn(coin, maxPrice, currentPrice, dipThreshold));
        }

      }

      await sleep(INTERVAL_MS);
      await checkPrices();
    };

    await checkPrices();
  }
})();
