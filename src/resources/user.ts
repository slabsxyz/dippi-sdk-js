import { Client, UserResponseBody } from '../interfaces/Dippi';

class User {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async getProfile(id: string): Promise<UserResponseBody> {
        const response = await fetch(`${this.client.url}/v1/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
        });

        return await response.json();
    }

    async updateProfile(data: any): Promise<UserResponseBody> {
        const response = await fetch(`${this.client.url}/v1/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.client.authToken}`,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    }
}

export default User;
