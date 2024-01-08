import {
    Client,
    WalletCreatePayload,
    WalletResponseBody,
    WalletUpdatePayload,
    WalletUpdateResponseBody,
    WalletRecoveryPayload,
    WalletRecoveryResponseBody,
    WalletGetNFTsPayload,
    OwnedNftsResponse
} from '../interfaces/Dippi';

class Wallet {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Retrieves a list of wallets.
     *
     * @returns {Promise<WalletResponseBody[]>} A promise that resolves to an array of wallet response bodies.
     */
    async list(): Promise<WalletResponseBody[]> {
        const response = await fetch(
            `${this.client.url}/v1/wallets/list-by-app`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
            },
        );

        return await response.json();
    }

    /**
     * Retrieves a specific wallet by its ID.
     *
     * @param {string} id - The ID of the wallet to retrieve.
     * @returns {Promise<WalletResponseBody>} A promise that resolves to the wallet response body.
     */
    async retrieve(id: string): Promise<WalletResponseBody> {
        const response = await fetch(`${this.client.url}/v1/wallets/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
        });

        return await response.json();
    }

    /**
     * Retrieves the balance of a wallet.
     *
     * @param {string} walletId - The ID of the wallet in the database
     * @returns {Promise<number | {
     *     address: string;
     *     tokenBalances: PromiseSettledResult<{
     *         contractAddress: any;
     *         tokenMetadata: TokenMetadataResponse;
     *         tokenBalance: string;
     *         tokenBalanceUSD: number;
     *         tokenAmount: string;
     *     }>[];
     * }>} A promise that resolves to the balance of the wallet.
     */
    async getBalance(id: string): Promise<WalletResponseBody> {
        const response = await fetch(`${this.client.url}/v1/wallets/${id}/balance`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
        });

        return await response.json();
    }

    /**
     * Updates a specific wallet by its ID.
     *
     * @param {string} id - The ID of the wallet to update.
     * @param {WalletUpdatePayload} data - The data to update the wallet with.
     * @returns {Promise<WalletUpdateResponseBody>} A promise that resolves to the updated wallet response body.
     */
    async update(
        id: string,
        data: WalletUpdatePayload,
    ): Promise<WalletUpdateResponseBody> {
        const response = await fetch(`${this.client.url}/v1/wallets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }

    /**
     * Creates a new wallet.
     *
     * @param {WalletCreatePayload} data - The data to create the wallet with.
     * @returns {Promise<WalletUpdateResponseBody>} A promise that resolves to the created wallet response body.
     */
    async create(
        data: WalletCreatePayload,
    ): Promise<WalletResponseBody> {
        const response = await fetch(`${this.client.url}/v1/wallets/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }

    /**
     * Retrieves NFTs owned by a wallet from a specific blockchain.
     * 
     * @param data {WalletGetNFTsPayload} The payload containing the wallet and blockchain information.
     * @returns {Promise<OwnedNftsResponse>} A promise that resolves to the response containing the owned NFTs.
     */
    async getNFTs(
        data: WalletGetNFTsPayload,
    ): Promise<OwnedNftsResponse> {
        const response = await fetch(`${this.client.url}/v1/wallets/get-wallet-nfts-by-chain`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }

    /**
     * Initiates the recovery process for a specific wallet by its ID.
     *
     * @param {string} id - The ID of the wallet to initiate recovery for.
     * @param {WalletRecoveryPayload} data - The data needed for the recovery process.
     * @returns {Promise<WalletRecoveryResponseBody>} A promise that resolves to the recovery response body.
     */
    async recovery(
        id: string,
        data: WalletRecoveryPayload,
    ): Promise<WalletRecoveryResponseBody> {
        const response = await fetch(
            `${this.client.url}/v1/wallets/${id}/recovery`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
                body: JSON.stringify(data),
            },
        );

        return await response.json();
    }

    /**
     * Retrieves the balance of a wallet.
     *
     * @param {string} id - The ID of the wallet in the database
     * @returns {Promise<any>} A promise that resolves to the balance of the wallet.
     */
    async balance(id: string): Promise<any> {
        const response = await fetch(
            `${this.client.url}/v1/wallets/${id}/balance`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
            },
        );

        return await response.json();
    }

    /**
     * Get NFTs from the Polygon network.
     * 
     * @deprecated This method is deprecated due to the fact that it only retrieves NFTs from the Polygon network.
     * @param id {string} 
     * @returns {Promise<any>}
     */
    async nfts(id: string): Promise<any> {
        const response = await fetch(
            `${this.client.url}/v1/wallets/${id}/nfts`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
            },
        );

        return await response.json();
    }

    /**
     * Retrieve Wallet Info
     * 
     * @param id {string} 
     * @param network {string} 
     * @returns {Promise<any>}
     */
    async getWalletInfo(id: string, network: string): Promise<any> {
        const response = await fetch(
            `${this.client.url}/v1/wallets/get-account-info?accountAddress=${id}&network=${network}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
            },
        );

        return await response.json();
    }
}

export default Wallet;
