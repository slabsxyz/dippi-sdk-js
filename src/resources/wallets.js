class Wallet {
    constructor(client) {
        this.client = client;
    }

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
}

module.exports = Wallet;