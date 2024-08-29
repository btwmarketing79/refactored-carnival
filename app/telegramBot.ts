import TelegramBot from 'node-telegram-bot-api';

// Load the Telegram bot token from the environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  throw new Error("Telegram bot token not found. Please set TELEGRAM_BOT_TOKEN in your .env.local file.");
}
const bot = new TelegramBot(token, { polling: true });

// Example: Respond to the /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome! Your bot is up and running.");
});

export default bot;
