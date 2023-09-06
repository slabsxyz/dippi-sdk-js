/**
 * Represents the Authentication class for handling login operations.
 */
class Auth {
    /**
     * Initializes the Auth class with the given client configuration.
     * 
     * @constructor
     * @param {Object} client - Contains configurations required for the authentication, including `url`, `appToken`, and `appId`.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Handles the login operation by sending a request to the external signup endpoint.
     * 
     * @async
     * @returns {Promise<Object>} Returns the response from the API after login attempt.
     * @throws {Error} Throws an error if there's an issue with the fetch request.
     */    
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