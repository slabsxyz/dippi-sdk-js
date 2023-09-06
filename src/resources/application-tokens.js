/**
 * Represents a class for handling operations related to Application Tokens.
 */
class ApplicationToken {
    /**
     * Initializes the ApplicationToken class with a given client configuration.
     * 
     * @constructor
     * @param {Object} client - Contains configurations required for token operations, including `url` and `authToken`.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Retrieves the details of a specific application token by its ID.
     * 
     * @async
     * @param {string|number} id - The ID of the application token to retrieve.
     * @returns {Promise<Object>} Returns the details of the application token from the API response.
     */
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