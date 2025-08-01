# GitHub Commit Notifications Bot

This little TG-bot is your faithful guardian of the Code Universe! It secretly spies on GitHub repositories (even private ones, if you plant a token), throws stylish alerts into the channel. Juggles a bunch of repositories, scans cheerfully every 5 minutes and hides cozily in Docker with data persistence. A true Commit Master with a cosmic vibe!


## Demo & Support

🤖 **Demo Bot**: [t.me/commiter_bot](https://t.me/commiter_bot)  
🔧 **Order Bot Installation**: [t.me/flabbycloud_bot](https://t.me/flabbycloud_bot?start=465926682)


## Features

- 🔔 Real-time notifications about new commits
- 🔒 Admin-only access control
- 🔄 Automatic repository monitoring
-  Persistent storage of repository data

## Prerequisites

- Node.js 18+
- GitHub Personal Access Token
- Telegram Bot Token
- Telegram Channel ID
- Admin Chat ID

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
GITHUB_TOKEN=your_github_personal_access_token
ADMIN_CHAT_ID=your_telegram_chat_id
CHANNEL_ID=your_telegram_channel_id
CHECK_INTERVAL=300000  # Optional: interval in milliseconds (default: 5 minutes)
```

## Installation and Running

1. Clone the repository:
```bash
git clone <repository-url>
cd github-telegram-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create and configure the `.env` file as described above.

4. Start the bot:
```bash
npm start
```

## Usage

1. Start a conversation with your bot in Telegram
2. Use the `/start` command to verify your admin access
3. Add repositories to monitor using:
```
/addrepo owner/repository
```
Example: `/addrepo microsoft/vscode`

## Bot Commands

- `/start` - Check if you have admin access
- `/addrepo <owner/repo>` - Add a new repository to monitor

## Directory Structure

```
├── data/                # Persistent storage
│   ├── repositories.json
│   └── lastCommits.json
├── services/
│   ├── githubService.js # GitHub API integration
│   └── telegramService.js # Telegram bot service
├── utils/
│   └── storage.js      # Data storage utilities
├── config.js           # Configuration management
├── index.js            # Main application file
```

## Message Format

Commit notifications in the Telegram channel will appear in the following format:

```
🌱 repository-name
> Commit message
Additional commit description (if any)
```

## Technical Details

- Built with Node.js
- Uses Grammy for Telegram Bot API
- Uses Octokit for GitHub API
- Configurable check interval (default: 5 minutes)
- Persistent storage using JSON files

## License

This project is licensed under the MIT License.
