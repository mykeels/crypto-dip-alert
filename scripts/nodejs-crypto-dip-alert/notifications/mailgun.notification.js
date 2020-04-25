const Mailgun = require('mailgun-js');

/**
 * posts a notification via email, using mailgun's API
 * @param {*} coin
 * @param {*} maxPrice
 * @param {*} currentPrice
 * @param {*} dipThreshold
 */
const notify = async (coin, maxPrice, currentPrice, dipThreshold) => {
  if (!process.env.NOTIFY_MAILGUN || process.env.NOTIFY_MAILGUN !== 'true') return;

  const mailgun = Mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  const dip = `-$${Math.abs(currentPrice - maxPrice)}`;
  const from = process.env.MAILGUN_FROM;
  const to = process.env.MAILGUN_TO;
  const subject = `${dip} price dip in ${coin.symbol}`;
  const html = `<p>Today, at ${new Date()}</p>,
  <p>We detected a ${dip} dip in the price of ${coin.symbol}, and thought we should let you know.</p>
  <p>The Price dropped from $${maxPrice} to $${currentPrice}.</p>
  <br>
  <p>Regards,</p>
  <p>Crypto Dip Alert</p>`
  const data = {
    from,
    to,
    subject,
    html
  };

  await mailgun.messages().send(
    data
  );
}

module.exports = notify;
