class ApplicationToken {
    constructor(client) {
        this.client = client;
    }

    async retrieve (id) {
        const response = await fetch(
            `${this.client.url}/v1/application-tokens/${id}`,
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

module.exports = ApplicationToken;