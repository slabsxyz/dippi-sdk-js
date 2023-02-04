class Auth {
    /*
    * @param {Object}
    */
    constructor(client) {
        this.client = client;
    }

    async login () {
        const response = await fetch(
            `${this.client.url}/v1/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.client.authToken}`
                },
                body: JSON.stringify(
                    {
                        email: this.client.email,
                        password: this.client.password,
                        apiToken: this.client.authToken
                    }
                ),
            }
        )
        return await response.json();
    }
}

module.exports = Auth;