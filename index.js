const { Bot } = require('grammy');
const config = require('./config');
const githubService = require('./services/githubService');
const telegramService = require('./services/telegramService');

// Инициализация бота
const bot = new Bot(config.TELEGRAM_BOT_TOKEN);

// Обработка команд
bot.command('start', (ctx) => {
  const chatId = ctx.chat.id.toString();
  if (chatId === config.ADMIN_CHAT_ID) {
    telegramService.sendMessage(bot, chatId, 'The bot is up and running! Use /addrepo <owner/repo> to add a repository.');
  } else {
    telegramService.sendMessage(bot, chatId, 'Access is allowed only to the administrator.');
  }
});

bot.command('addrepo', async (ctx) => {
  const chatId = ctx.chat.id.toString();
  if (chatId !== config.ADMIN_CHAT_ID) {
    return telegramService.sendMessage(bot, chatId, 'Access is allowed only to the administrator.');
  }

  const repo = ctx.message.text.split(' ')[1];
  if (!repo || !repo.includes('/')) {
    return telegramService.sendMessage(bot, chatId, 'Please specify the repository in the format owner/repo');
  }

  try {
    await githubService.addRepository(repo);
    telegramService.sendMessage(bot, chatId, `The ${repo} repository has been added for tracking purposes.`);
  } catch (error) {
    telegramService.sendMessage(bot, chatId, `Error adding repository: ${error.message}`);
  }
});

// Периодическая проверка новых коммитов
setInterval(async () => {
  try {
    await githubService.checkNewCommits(bot);
  } catch (error) {
    console.error('Error checking commits:', error);
  }
}, config.CHECK_INTERVAL);

// Запуск бота
bot.start().then(() => {
  console.log('The bot is up and running...');
}).catch((err) => {
  console.error('Error starting the bot:', err);
});