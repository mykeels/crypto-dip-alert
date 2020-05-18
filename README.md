# Crypto Dip Alert

Contains software for notifying the user, when the price of monitored cryptocurrency, drops past a set threshold.

## Included Software

- [NodeJS Script](./scripts/nodejs-crypto-dip-alert/README.md)
- [React Native App](./app/README.md)

## Third Party API

- [coincap.io](https://docs.coincap.io/?version=latest)

## Custom Notifications

To add a Custom Notification Provider:
* Create a file entry in the `scripts/nodejs-crypto-dip-alert/notifications` folder ending with `.notification.js`
* Expose a `notify` function from `module.exports`
* The function is an async function so return a Promise
* Function has the following as parameters
    * `coin`
    * `maxPrice`
    * `currentPrice`
    * `dipThreshold`
* You can add configs to the `.env` file to determine if custom notif will be used.
* e.g. `NOTIFY_YORUBA=` `NOTIFY_MAILGUN=`

### Example with Yoruba Notification
```js

/**
 * posts a notification in the terminal console
 * @param {{symbol: string, priceUsd: number}} coin
 * @param {number} maxPrice
 * @param {number} currentPrice
 * @param {number} dipThreshold
 */
const notify = async (coin, maxPrice, currentPrice, dipThreshold) => {
  // early return if not set in env flags
  if (!process.env.NOTIFY_YORUBA || process.env.NOTIFY_YORUBA !== 'true') return;
  console.log(`[🚨🚨🚨💰🚨🚨🚨] Egbami, ye, 😢 ${coin.symbol} ti jona`);
  console.log(`[👀] Iwọn ti o pọju: ${maxPrice} `);
  console.log(`[👀] Ni in si: ${currentPrice} `);
  console.log(`[👀] Àbáwọlé: ${dipThreshold} `);
  // await here if you need to
  return Promise.resolve();
}

module.exports = notify;
```