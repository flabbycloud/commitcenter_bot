async function sendMessage(bot, chatId, message, options = {}) {
  try {
    const cleanedMessage = message.trim().replace(/\n{2,}/g, '\n');
    await bot.api.sendMessage(chatId, cleanedMessage, { ...options, parse_mode: options.parse_mode || 'HTML' });
  } catch (error) {
    console.error(`Failed to send message to chat ${chatId}:`, error.message);
  }
}

module.exports = {
  sendMessage,
};