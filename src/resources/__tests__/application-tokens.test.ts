import ApplicationToken from '../application-tokens';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('ApplicationToken', () => {
    let appToken: ApplicationToken;
    const mockClient = {
        url: 'http://localhost',
        authToken: 'testToken',
    };

    beforeEach(() => {
        appToken = new ApplicationToken(mockClient);
        fetchMock.resetMocks();
    });

    it('should retrieve application token', async () => {
        const mockResponse = { id: '1', name: 'Test App Token' };
        fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

        const response = await appToken.retrieve('1');

        expect(fetchMock).toHaveBeenCalledWith(
            `${mockClient.url}/v1/application-tokens/1`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${mockClient.authToken}`,
                },
            },
        );
        expect(response).toEqual(mockResponse);
    });
});
