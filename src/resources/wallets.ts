import {
    Client,
    WalletResponseBody,
    WalletUpdatePayload,
    WalletUpdateResponseBody,
    WalletRecoveryPayload,
    WalletRecoveryResponseBody,
} from '../interfaces/Dippi';

class Wallet {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

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
