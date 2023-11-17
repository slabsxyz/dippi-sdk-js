import Auth from '../auth';

describe('Auth', () => {
    let auth: Auth;

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
