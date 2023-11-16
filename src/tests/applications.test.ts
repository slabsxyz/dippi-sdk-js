import { Client, ApplicationResponseBody, ApplicationCreatePayload, ApplicationUpdatePayload } from '../interfaces/Dippi';
import Application from '../resources/applications';

describe('Application', () => {
    let client: Client;
    let application: Application;

    beforeEach(() => {
        client = {
            url: 'http://localhost:3000',
            authToken: 'testToken'
        };
        application = new Application(client);
    });

    describe('list', () => {
        it('should return a list of applications', async () => {
            // Test code goes here
        });
    });

    describe('create', () => {
        it('should create a new application and return its details', async () => {
            // Test code goes here
        });
    });

    describe('retrieve', () => {
        it('should return the details of a specific application', async () => {
            // Test code goes here
        });
    });

    describe('update', () => {
        it('should update the details of a specific application and return the updated details', async () => {
            // Test code goes here
        });
    });
});
