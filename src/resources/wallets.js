/**
 * Represents a Wallet, providing methods to interact with the wallet's API endpoints.
 */
class Wallet {
    /**
     * Creates a new Wallet instance.
     *
     * @param {Object} client - The client object containing the URL and authentication token.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Fetches a list of wallets associated with your application.
     *
     * @async
     * @returns {Promise<Object[]>} Returns a promise that resolves with the list of wallets.
     * @throws {Error} Throws an error if the request fails.
     */
    async list () {
        const response = await fetch(
            `${this.client.url}/v1/wallets/list-by-app`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
            }
        )

        return await response.json();
    }
    /**
     * Fetches wallet information for a specific wallet ID.
     *
     * @async
     * @param {string} id - The ID of the wallet to retrieve.
     * @returns {Promise<Object>} Returns a promise that resolves with the wallet's details.
     * @throws {Error} Throws an error if the request fails.
     */
    async retrieve (id) {
        const response = await fetch(
            `${this.client.url}/v1/wallets/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
            }
        )

        return await response.json();
    }
    /**
     * Updates wallet information for a specific wallet ID with provided data.
     *
     * @async
     * @param {string} id - The ID of the wallet to update.
     * @param {Object} data - The data to update the wallet with.
     * @returns {Promise<Object>} Returns a promise that resolves with the updated wallet's details.
     * @throws {Error} Throws an error if the request fails.
     */
    async update (id, data) {
        const response = await fetch(
            `${this.client.url}/v1/wallets/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
                body: JSON.stringify(data),
            }
        )

        return await response.json();
    }
    /**
     * Initiates a recovery process for a specific wallet ID using the provided data.
     *
     * @async
     * @param {string} id - The ID of the wallet to initiate recovery for.
     * @param {Object} data - The recovery-related data.
     * @returns {Promise<Object>} Returns a promise that resolves with the recovery process response.
     * @throws {Error} Throws an error if the request fails.
     */
    async recovery (id, data) {
        const response = await fetch(
            `${this.client.url}/v1/wallets/${id}/recovery`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
                body: JSON.stringify(data)
            }
        )

        return await response.json();
    }
    /**
     * Retrieves the balance for a specific wallet ID.
     *
     * @async
     * @param {string} id - The ID of the wallet to retrieve the balance for.
     * @returns {Promise<Object>} Returns a promise that resolves with the balance details.
     * @throws {Error} Throws an error if the request fails.
     */
    async balance (id) {
        const response = await fetch(
            `${this.client.url}/v1/wallets/${id}/balance`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
            }
        )

        return await response.json();
    }
    /**
     * Fetches the Non-Fungible Tokens (NFTs) associated with a specific wallet by its ID.
     *
     * @async
     * @param {string} id - The unique identifier of the wallet.
     * @returns {Promise<Object[]>} A promise that resolves to an array of NFT details for the given wallet ID.
     * @throws {Error} In case of a failed fetch operation.
     */
    async nfts (id) {
        const response = await fetch(
            `${this.client.url}/v1/wallets/${id}/nfts`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
            }
        )

        return await response.json();
    }
    /**
     * Fetches wallet information based on the provided account ID and network.
     *
     * @async
     * @param {string} id - The account ID.
     * @param {string} network - The network name (e.g., 'mainnet', 'testnet').
     * @returns {Promise<Object>} Returns a promise that resolves with the wallet information.
     * @throws {Error} Throws an error if the request fails.
     */
    async getWalletInfo (id, network) {
        const response = await fetch(
            `${this.client.url}/v1/wallets/get-account-info?accountAddress=${id}&network=${network}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
            }
        )

        return await response.json();
    }
}

module.exports = Wallet;