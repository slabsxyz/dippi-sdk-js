class Auth {
    /*
    * @param {Object}
    */
    constructor(client) {
        this.client = client;
    }

    async login () {
        const response = await fetch(
            `${this.client.url}/v1/auth/external-signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        token: this.client.appToken,
                        applicationId: this.client.appId,
                    }
                ),
            }
        )
        return await response.json();
    }
}

module.exports = Auth;