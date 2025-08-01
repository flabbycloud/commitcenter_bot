require('dotenv').config();

module.exports = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  ADMIN_CHAT_ID: process.env.ADMIN_CHAT_ID,
  CHANNEL_ID: process.env.CHANNEL_ID,
  CHECK_INTERVAL: parseInt(process.env.CHECK_INTERVAL) || 300000, 
};