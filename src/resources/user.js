export class User {
    constructor(client) {
        this.client = client;
    }

    async getProfile () {
        const response = await fetch(
            `${this.client.url}/v1/me`,
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

    async updateProfile (data) {
        const response = await fetch(
            `${this.client.url}/v1/me`,
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
}
