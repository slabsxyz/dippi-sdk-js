class TokenAccountFunc {
    constructor(client) {
        this.client = client;
    }

    

    async create (params) {
        const response = await fetch(
            `${this.client.url}/v1/wallets/create-6551nft`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
                body: JSON.stringify(params),
            }
        )

        return await response.json();
    }
    

}

module.exports = TokenAccountFunc;