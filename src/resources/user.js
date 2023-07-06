class User {
    constructor(client) {
        this.client = client;
    }

    async getProfile (id) {
        const response = await fetch(
            `${this.client.url}/v1/users/${id}`,
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

module.exports = User;