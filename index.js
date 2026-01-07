const axios = require('axios');

class DiscordThings {
    /**
     * @param {string} token - Your Bot's API Token (from User Profile)
     * @param {Object} options - Optional settings
     * @param {string} [options.baseUrl='https://discordthings.com/api'] - API Base URL
     */
    constructor(token, options = {}) {
        if (!token) throw new Error('A valid API Token is required');

        this.token = token;
        this.baseUrl = options.baseUrl || 'https://discordthings.com/api';

        this.client = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        });
    }

    /**
     * Post Server and Shard Count Stats
     * @param {string} botId - The ID of the bot
     * @param {number} serverCount - Total number of servers
     * @param {number} [shardCount=0] - Total number of shards (optional)
     * @returns {Promise<Object>} API Response
     */
    async postStats(botId, serverCount, shardCount = 0) {
        if (!botId) throw new Error('Bot ID is required');

        try {
            const response = await this.client.post(`/bots/${botId}/stats`, {
                server_count: serverCount,
                shard_count: shardCount
            });
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Check if a user has voted for a bot
     * @param {string} botId - The ID of the bot
     * @param {string} userId - The ID of the user to check
     * @returns {Promise<Object>} { voted: boolean, lastVote: Date, nextVote: Date }
     */
    async checkVote(botId, userId) {
        if (!botId || !userId) throw new Error('Bot ID and User ID are required');

        try {
            const response = await this.client.get(`/bots/${botId}/check-vote`, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    /**
     * Sync commands for the bot
     * @param {string} botId - The ID of the bot
     * @param {Array} commands - Array of command objects
     * @returns {Promise<Object>} API Response
     */
    async syncCommands(botId, commands) {
        if (!botId || !Array.isArray(commands)) throw new Error('Bot ID and commands array are required');

        try {
            const response = await this.client.post(`/bots/${botId}/commands`, {
                commands
            });
            return response.data;
        } catch (error) {
            this._handleError(error);
        }
    }

    _handleError(error) {
        if (error.response) {
            throw new Error(`API Error [${error.response.status}]: ${error.response.data.error || error.response.statusText}`);
        }
        throw error;
    }
}

module.exports = DiscordThings;
