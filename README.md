# 🚀 DiscordThings API Wrapper

[![npm version](https://img.shields.io/npm/v/discordthings-api.svg)](https://www.npmjs.com/package/discordthings-api)
[![license](https://img.shields.io/npm/l/discordthings-api.svg)](https://github.com/wdiscordthings/discordthings-api/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/1324151706698682419?color=7289da&label=Discord&logo=discord)](https://discord.gg/discordthings)

The official Node.js library for interacting with the [DiscordThings.com](https://discordthings.com) API. Efficiently manage your bot's stats, synchronize slash commands, and verify user votes with a modern, promise-based wrapper.

---

## ✨ Features

- 📊 **Post Stats**: Keep your bot's server and shard count up to date.
- 🗳️ **Vote Verification**: Reward your users by checking if they've voted for your bot.
- ⚡ **Command Sync**: Push your bot's Slash Commands directly to our platform for better visibility.
- 🛠️ **Lightweight**: Zero dependencies (only `axios`).

## 📦 Installation

```bash
npm install discordthings-api
```

## 🚀 Quick Start

First, obtain your **API Token** from your [Developer Profile](https://discordthings.com/dashboard) on DiscordThings.

```javascript
const DiscordThings = require('discordthings-api');

// Initialize the client
const dthings = new DiscordThings('YOUR_USER_API_TOKEN');

const BOT_ID = '123456789012345678'; // Your Bot ID
```

### 1. Update Server Count
```javascript
async function updateStats() {
    try {
        await dthings.postStats(BOT_ID, 1250);
        console.log('✅ Stats updated on DiscordThings!');
    } catch (err) {
        console.error('❌ Error updating stats:', err.message);
    }
}
```

### 2. Verify Votes
```javascript
async function checkVote(userId) {
    try {
        const result = await dthings.checkVote(BOT_ID, userId);
        
        if (result.voted) {
            console.log('🎉 User has voted!');
        } else {
            console.log('⏳ User hasn\'t voted in the last 12 hours.');
        }
    } catch (err) {
        console.error('❌ Error checking vote:', err.message);
    }
}
```

### 3. Sync Slash Commands
```javascript
async function syncCommands() {
    const commands = [
        {
            name: 'ping',
            description: 'Check bot latency',
            type: 1 // Chat Input
        },
        {
            name: 'help',
            description: 'Get list of commands',
            options: [{ name: 'cmd', description: 'Command to check', type: 3 }]
        }
    ];

    try {
        await dthings.syncCommands(BOT_ID, commands);
        console.log('📡 Commands synced successfully!');
    } catch (err) {
        console.error('❌ Sync failed:', err.message);
    }
}
```

## 📖 API Reference

### `new DiscordThings(token, [options])`
- `token` (String): Your personal API Token.
- `options.baseUrl` (String): Override default API endpoint.

### `postStats(botId, serverCount, [shardCount])`
- Updates the bot's server and shard presence.
- Returns `Promise<Object>`.

### `checkVote(botId, userId)`
- Checks for a valid vote cast within the last 12 hours.
- Returns `Promise<{ voted: Boolean, lastVote: Date, nextVote: Date }>`.

### `syncCommands(botId, commands)`
- Synchronizes your bot's command list with the platform.
- `commands`: Array of Command Objects (name, description, options, type).
- Returns `Promise<Object>`.

---

Built with ❤️ by the [DiscordThings](https://discordthings.com) Team.
