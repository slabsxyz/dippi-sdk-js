declare module '@dippixyz/sdk' {
    export interface DippiOptions {
        appToken: string;
        appId: string;
        url: string;
        authToken?: string;
        urlReturn?: string;
    }

    export interface TBAOptions {
        appToken: string;
        appId: string;
        url: string;
        authToken?: string;
    }

    export interface InitArgs {
        destinationWallet: string;
        chainId: string;
        gasLimit?: string;
        nftContract: string;
        nftId: string;
    }

    class TBA {
        auth: Auth;
        _tokenBoundAccount: TokenBoundAccountInterface;
        init(args: InitArgs): Promise<any>;
        create(): Promise<any>;
        estimateGas(): Promise<string>;
        createAccount(): Promise<any>;
        setAuthToken(newAuthToken: string): Promise<void>;
    }

    class Dippi {
        constructor(config: DippiOptions);
        setAuthToken(newAuthToken: string): void;
        auth: AuthInterface;
        user: UserInterface;
        wallet: WalletInterface;
        application: ApplicationInterface;
        applicationToken: ApplicationTokenInterface;
    }

    export { Dippi, TBA };
}
