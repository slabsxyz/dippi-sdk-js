import User from '../user';
import { Client, UserResponseBody } from '../../interfaces/Dippi';

describe('User', () => {
    let user: User;
    let client: Client;

    beforeEach(() => {
        client = {
            url: 'http://localhost:3000',
            authToken: 'testToken',
        };
        user = new User(client);
    });

    describe('getProfile', () => {
        it('should fetch the user profile', async () => {
            // Mock fetch function here
            // Call getProfile and assert the result
        });
    });

    describe('updateProfile', () => {
        it('should update the user profile', async () => {
            // Mock fetch function here
            // Call updateProfile and assert the result
        });
    });
});
