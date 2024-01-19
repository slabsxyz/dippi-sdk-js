import {
    Wallet as WalletInterface,
    WalletResponseBody,
} from '../../interfaces/Dippi';
import Wallet from '../wallets';

describe('Wallet', () => {
    let wallet: WalletInterface;
    let mockClient: any;

    beforeEach(() => {
        mockClient = {
            url: 'http://localhost:3000',
            authToken: 'testToken',
        };
        wallet = new Wallet(mockClient);
    });

    it('should initialize with the correct client', () => {
        expect(wallet.client).toBe(mockClient);
    });

    // Add more tests here for the other methods in the Wallet class
    it('should return wallet info', () => {
        let walletInfo: WalletResponseBody = {
            // Replace with values and params that can be confirmed...
            id: 'string',
            name: 'string',
            address: 'string',
            fileId: 'string',
            ownerId: 'string',
            createdAt: new Date(),
            updatedAt: new Date(),
            privateKey: 'string', // Add the privateKey property
        };
        expect(wallet.getWalletInfo('testId', 'testNetwork')).toBe(walletInfo);
    });

    it('should return wallet info', () => {
        let walletInfo: any;
        expect(wallet.list()).toBe(walletInfo);
    });
});
