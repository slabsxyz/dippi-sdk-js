import { ClientAuth, TokenPair, GetUrlResponse } from '../interfaces/Dippi';

/**
 * Represents the Authentication class for handling login operations.
 */
class Auth {
    client: ClientAuth;

    /**
     * Initializes the Auth class with the given client configuration.
     *
     * @constructor
     * @param {ClientAuth} client - Contains configurations required for the authentication, including `url`, `appToken`, and `appId`.
     */
    constructor(client: ClientAuth) {
        this.client = client;
    }

    /**
     * Handles the login operation by sending a request to the external signup endpoint.
     *
     * @async
     * @returns {Promise<TokenPair>} Returns the response from the API after login attempt.
     * @throws {Error} Throws an error if there's an issue with the fetch request.
     */
    async login(): Promise<TokenPair> {
        const response = await fetch(
            `${this.client.url}/v1/auth/external-signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: this.client.appToken,
                    applicationId: this.client.appId,
                }),
            },
        );
        return await response.json();
    }

    async getUrl(): Promise<GetUrlResponse> {
        const response = await fetch(`${this.client.url}/v1/auth/get-url`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: this.client.appToken,
                applicationId: this.client.appId,
                urlReturn: this.client.urlReturn,
            }),
        });
        return await response.json();
    }
}

export default Auth;
