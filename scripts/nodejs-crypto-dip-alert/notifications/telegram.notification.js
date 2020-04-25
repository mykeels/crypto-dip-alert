const { TelegramClient } = require('messaging-api-telegram');

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const client = TelegramClient.connect(token);

/**
 * posts a notification to telegram
 * @param {*} coin
 * @param {*} maxPrice
 * @param {*} currentPrice
 * @param {*} dipThreshold
 */
const notify = async (coin, maxPrice, currentPrice, dipThreshold) => {
  if (!process.env.NOTIFY_TELEGRAM || process.env.NOTIFY_TELEGRAM !== 'true') return;

  const dip = `-$${Math.abs(currentPrice - maxPrice)}`;
  const text = `We detected a ${dip} dip in the price of ${coin.symbol}, and thought we should let you know.\n\nThe Price dropped from $${maxPrice} to $${currentPrice}.`;

  await client.sendMessage(
    chatId,
    text,
    {
      disable_web_page_preview: true,
    }
  );
}

module.exports = notify;
