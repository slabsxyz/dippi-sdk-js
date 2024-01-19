import {
    Client,
    UserResponseBody,
    UserCreatePayload,
    SignInPayload,
    ResetPasswordPayload,
    ChangePasswordPayload,
    Error,
    UserData,
} from '../interfaces/Dippi';


class User {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Retrieves the profile of a specific user by their ID.
     *
     * @param {string} id - The ID of the user to retrieve the profile for.
     * @returns {Promise<UserResponseBody | Error>} A promise that resolves to the user's profile response body.
     */
    async getProfile(id: string): Promise<UserResponseBody | Error> {
        const response = await fetch(`${this.client.url}/v1/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
        });
        try {
            const responseBody = await response.json();
            if (responseBody.statusCode === 400) {
                return {
                    error: true,
                    code: responseBody.statusCode,
                    message: responseBody.message
                };
            }
            return responseBody
        } catch (error) {
            throw error;
        }
        
    }

    /**
     * Creates a new user profile.
     *
     * @param {UserCreatePayload} data - The data to create the user profile with.
     * @returns {Promise<UserData | Error>} A promise that resolves to the created user's profile response body.
     */
    async createProfile(data: UserCreatePayload): Promise<UserData | Error> {
        const response = await fetch(`${this.client.url}/v1/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
            body: JSON.stringify(data),
        });
        try {
            const responseBody = await response.json();
            if (responseBody.statusCode === 400) {
                return {
                    error: true,
                    code: responseBody.statusCode,
                    message: responseBody.message
                };
            }
            return responseBody
        } catch (error) {
            throw error;
        }
        
    }

    /**
     * Authenticates a user.
     *
     * @param {SignInPayload} data - The data needed for user authentication.
     * @returns {Promise<UserResponseBody | Error>} A promise that resolves to the sign-in response body.
     */
    async authenticate(data: SignInPayload): Promise<UserResponseBody | Error> {
        
        const response = await fetch(
            `${this.client.url}/v1/auth/external-signin`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
                body: JSON.stringify(data),
            },
        );
        
        try {
            const responseBody = await response.json();
            
            if (responseBody.statusCode === 400) {
                return {
                    error: true,
                    code: responseBody.statusCode,
                    message: responseBody.message
                };
            }
            return responseBody;
        } catch (error) {
            throw error;
        }

    }

    /**
     * Sends password reset link for user.
     *
     * @param {ResetPasswordPayload} data - The data needed for user authentication.
     * @returns {Promise<void>} A promise that resolves to a success message if completed.
     */
    async resetPassword(data: ResetPasswordPayload): Promise<void> {
        const response = await fetch(
            `${this.client.url}/v1/auth/user-forgot-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
                body: JSON.stringify(data),
            },
        );

        return await response.json();
    }

    /**
     * Changes password for user.
     *
     * @param {ChangePasswordPayload} data - The data needed for user authentication and password change.
     * @returns {Promise<void>} A promise that resolves to a success message if completed.
     */
    async changePassword(data: ChangePasswordPayload): Promise<void> {
        const response = await fetch(
            `${this.client.url}/v1/auth/user-change-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client.authToken}`,
                },
                body: JSON.stringify(data),
            },
        );

        return await response.json();
    }

    /**
     * Authenticates a user.
     *
     * @param {SignInPayload} data - The data needed for user authentication.
     * @returns {Promise<SigninResponseBody> | Error} A promise that resolves to the sign-in response body.
     */
    async updateProfile(data: any): Promise<UserResponseBody | Error> {
        const response = await fetch(`${this.client.url}/v1/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
            body: JSON.stringify(data),
        });

        
        try {
            const responseBody = await response.json();
            
            if (responseBody.statusCode === 400) {
                return {
                    error: true,
                    code: responseBody.statusCode,
                    message: responseBody.message
                };
            }
            return responseBody;
        } catch (error) {
            throw error;
        }

    }
}

export default User;