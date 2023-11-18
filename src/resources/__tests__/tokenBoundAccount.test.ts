import TokenBoundAccount from '../tokenBoundAccount';

describe('TokenBoundAccount', () => {
    let tba: TokenBoundAccount;

    beforeEach(() => {
        // Initialize TokenBoundAccount before each test
        tba = new TokenBoundAccount({
            url: 'https://api.dippi.xyz',
            authToken: 'testAuthToken',
        });
    });

    // Add your tests here
    test('should create an instance of TokenBoundAccount', () => {
        expect(tba).toBeInstanceOf(TokenBoundAccount);
    });
});
