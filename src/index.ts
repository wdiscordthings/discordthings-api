import axios, { AxiosInstance } from 'axios';

export interface DiscordThingsOptions {
    baseUrl?: string;
}

export interface VoteResult {
    voted: boolean;
    lastVote: string | null;
    nextVote: string | null;
}

export interface CommandOption {
    name: string;
    description: string;
    type: number;
    required?: boolean;
    choices?: { name: string; value: string | number }[];
    options?: CommandOption[];
}

export interface Command {
    name: string;
    description: string;
    type?: number;
    options?: CommandOption[];
}

export class DiscordThings {
    private client: AxiosInstance;

    /**
     * @param {string} token - Your User API Token
     * @param {DiscordThingsOptions} [options] - Configuration options
     */
    constructor(token: string, options: DiscordThingsOptions = {}) {
        if (!token) throw new Error('API Token is required');

        this.client = axios.create({
            baseURL: options.baseUrl || 'https://discordthings.com/api',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Post bot statistics to DiscordThings
     * @param {string} botId - The ID of the bot
     * @param {number} serverCount - Total number of servers the bot is in
     * @param {number} [shardCount] - Total number of shards (optional)
     * @returns {Promise<any>} API Response
     */
    async postStats(botId: string, serverCount: number, shardCount?: number): Promise<any> {
        if (!botId || serverCount === undefined) throw new Error('Bot ID and server count are required');

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
     * Check if a user has voted for the bot
     * @param {string} botId - The ID of the bot
     * @param {string} userId - The ID of the user
     * @returns {Promise<VoteResult>} Vote status object
     */
    async checkVote(botId: string, userId: string): Promise<VoteResult | undefined> {
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
     * @param {Command[]} commands - Array of command objects
     * @returns {Promise<any>} API Response
     */
    async syncCommands(botId: string, commands: Command[]): Promise<any> {
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

    private _handleError(error: any): never {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(`API Error [${error.response.status}]: ${error.response.data.error || error.response.statusText}`);
        }
        throw error;
    }
}

// Support CommonJS require and ES imports
export default DiscordThings;
module.exports = DiscordThings;
// To maintain compatibility with the previous require('discordthings-api') pattern
module.exports.default = DiscordThings;
module.exports.DiscordThings = DiscordThings;
