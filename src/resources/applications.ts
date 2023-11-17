import {
    Client,
    ApplicationResponseBody,
    ApplicationCreatePayload,
    ApplicationUpdatePayload,
} from '../interfaces/Dippi';

/**
 * Represents an Application class for managing application-based operations.
 */
class Application {
    client: Client;

    /**
     * Initializes the Application class with a given client configuration.
     *
     * @constructor
     * @param {Client} client - Contains configurations required for the application operations, including `url` and `authToken`.
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Retrieves a list of applications.
     *
     * @async
     * @returns {Promise<ApplicationResponseBody[]>} Returns a list of applications in the response from the API.
     */
    async list(): Promise<ApplicationResponseBody[]> {
        const response = await fetch(`${this.client.url}/v1/applications`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
        });

        return await response.json();
    }

    /**
     * Creates a new application.
     *
     * @async
     * @param {ApplicationCreatePayload} data - Data needed to create a new application.
     * @returns {Promise<ApplicationResponseBody>} Returns the created application's details from the API response.
     */
    async create(
        data: ApplicationCreatePayload,
    ): Promise<ApplicationResponseBody> {
        const response = await fetch(`${this.client.url}/v1/applications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }

    /**
     * Retrieves the details of a specific application by its ID.
     *
     * @async
     * @param {string|number} id - The ID of the application to retrieve.
     * @returns {Promise<ApplicationResponseBody>} Returns the details of the application from the API response.
     */
    async retrieve(id: string | number): Promise<ApplicationResponseBody> {
        const response = await fetch(
            `${this.client.url}/v1/applications/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
            },
        );

        return await response.json();
    }

    /**
     * Updates the details of a specific application by its ID.
     *
     * @async
     * @param {string|number} id - The ID of the application to update.
     * @param {ApplicationUpdatePayload} data - Data to update the application with.
     * @returns {Promise<ApplicationResponseBody>} Returns the updated application's details from the API response.
     */
    async update(
        id: string | number,
        data: ApplicationUpdatePayload,
    ): Promise<ApplicationResponseBody> {
        const response = await fetch(
            `${this.client.url}/v1/applications/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
                body: JSON.stringify(data),
            },
        );

        return await response.json();
    }
}

export default Application;
