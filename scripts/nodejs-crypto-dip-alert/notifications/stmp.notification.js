/**
 * posts a notification via email, using SMTP
 * @param {*} coin
 * @param {*} maxPrice
 * @param {*} currentPrice
 * @param {*} dipThreshold
 */
const notify = (coin, maxPrice, currentPrice, dipThreshold) => {
  if (!process.env.NOTIFY_TELEGRAM) return;

}

export default notify;
