/**
 * Represents a user.
 */
class User {
    /**
     * Create a user instance.
     * @param {Object} client - The client instance with configuration details.
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Fetch the user's profile.
     * @async
     * @returns {Promise<Object>} The user's profile data.
     * @throws {Error} Throws an error if the request fails.
     */
    async getProfile () {
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

    /**
     * Update the user's profile with provided data.
     * @async
     * @param {Object} data - The data to update the user's profile with.
     * @returns {Promise<Object>} The updated user's profile data.
     * @throws {Error} Throws an error if the request or update fails.
     */
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

module.exports = User;