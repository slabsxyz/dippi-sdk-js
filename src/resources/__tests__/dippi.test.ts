import { Dippi, TBA } from '../../dippi';

describe('Dippi', () => {
    let dippi: Dippi;

    beforeEach(() => {
        dippi = new Dippi({
            appToken: 'testToken',
            appId: 'testId',
            url: 'testUrl',
            authToken: 'testAuthToken',
            urlReturn: 'testUrlReturn',
        });
    });

    // Add your tests here
});

describe('TBA', () => {
    let tba: TBA;

    beforeEach(() => {
        tba = new TBA({
            appToken: 'testToken',
            appId: 'testId',
            url: 'testUrl',
            authToken: 'testAuthToken',
        });
    });

    // Add your tests here
});
