/**
 * posts a notification in the terminal console
 * @param {*} coin
 * @param {*} maxPrice
 * @param {*} currentPrice
 * @param {*} dipThreshold
 */
const notify = async (coin, maxPrice, currentPrice, dipThreshold) => {
  if (!process.env.NOTIFY_CONSOLE || process.env.NOTIFY_CONSOLE !== 'true') return;
  console.log(coin.symbol, `🚨🚨🚨 ALERT!!! 🚨🚨🚨`);
  await Promise.resolve();
}

module.exports = notify;
