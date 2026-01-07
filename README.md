# DiscordThings API Wrapper

Official NPM package for interacting with the **DiscordThings.com** API.  
Easily post bot stats and check user votes.

## Installation

```bash
npm install discordthings-api
```

## Usage

First, get your **API Token** from your User Profile on DiscordThings.

```javascript
const DiscordThings = require('discordthings-api');

// Initialize with your User API Token
const dthings = new DiscordThings('YOUR_API_TOKEN');

const BOT_ID = 'YOUR_BOT_ID';

async function syncStats() {
    try {
        // Post Server Count (and optional Shard Count)
        await dthings.postStats(BOT_ID, 1500, 2);
        console.log('Stats posted successfully!');
    } catch (error) {
        console.error('Failed to post stats:', error.message);
    }
}

async function handleVoteCheck(userId) {
    try {
        // Check if a user voted
        const result = await dthings.checkVote(BOT_ID, userId);
        
        if (result.voted) {
            console.log(`User ${userId} has voted!`);
            console.log(`Next vote allowed at: ${result.nextVote}`);
        } else {
            console.log(`User ${userId} has not voted yet.`);
        }
    } catch (error) {
        console.error('Error checking vote:', error.message);
    }
}

syncStats();
```

## Methods

### `constructor(token, options?)`
- `token`: Your API Token from the dashboard.
- `options.baseUrl`: Optional (default: `https://discordthings.com/api`).

### `postStats(botId, serverCount, shardCount?)`
- Updates the server and shard count for the specified bot.
- **Note:** You must be the owner of the bot associated with the API Token.

### `checkVote(botId, userId)`
- Checks if a specific user has voted for the bot in the last 12 hours.
- Returns: `{ voted: boolean, lastVote: Date|null, nextVote: Date|null }`.
