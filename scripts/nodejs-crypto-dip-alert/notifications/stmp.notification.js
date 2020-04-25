const nodemailer = require('nodemailer');

/**
 * posts a notification via email, using SMTP
 * @param {*} coin
 * @param {*} maxPrice
 * @param {*} currentPrice
 * @param {*} dipThreshold
 */
const notify = async (coin, maxPrice, currentPrice, dipThreshold) => {
  if (!process.env.NOTIFY_SMTP || process.env.NOTIFY_SMTP !== 'true') return;

  try {
    const dip = `-$${Math.abs(currentPrice - maxPrice)}`;
    const from = process.env.SMTP_FROM;
    const to = process.env.SMTP_TO;
    const user = process.env.SMTP_USERNAME;
    const pass = process.env.SMTP_PASSWORD;
    const host = process.env.SMTP_HOSTNAME;
    const port = process.env.SMTP_PORT;
    const secure = process.env.SMTP_USE_SSL === 'true';
    const subject = `${dip} price dip in ${coin.symbol}`;
    const html = `<p>Today, at ${new Date()}</p>,
  <p>We detected a ${dip} dip in the price of ${
      coin.symbol
    }, and thought we should let you know.</p>
  <p>The Price dropped from $${maxPrice} to $${currentPrice}.</p>
  <br>
  <p>Regards,</p>
  <p>Crypto Dip Alert</p>`;

    let transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from, // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });
  } catch (err) {
    console.error(err)
  }
};

module.exports = notify;
