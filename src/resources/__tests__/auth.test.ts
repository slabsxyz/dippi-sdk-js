import Auth from '../auth';
import { Auth as AuthInterface } from '../../interfaces/Dippi';

describe('Auth', () => {
    let auth: AuthInterface;

    beforeEach(() => {
        // Initialize auth before each test
        auth = new Auth({
            url: 'https://api.dippi.xyz',
            appToken: 'testAppToken',
            appId: 'testAppId',
            authToken: 'testAuthToken',
            urlReturn: 'testUrlReturn',
        });
    });

    // Add your tests here
    test('should create an instance of Auth', () => {
        expect(auth).toBeInstanceOf(Auth);
    });
});
