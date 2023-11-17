declare module '@dippixyz/sdk' {
    import {
        User as UserInterface,
        Auth as AuthInterface,
        Wallet as WalletInterface,
        Application as ApplicationInterface,
        ApplicationToken as ApplicationTokenInterface,
        DippiConfig,
        InitArgs,
    } from './interfaces/Dippi';
    import { TokenBoundAccountInterface } from './interfaces/TokenBoundAccountInterface';

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
        constructor(config: DippiConfig);
        setAuthToken(newAuthToken: string): void;
        auth: AuthInterface;
        user: UserInterface;
        wallet: WalletInterface;
        application: ApplicationInterface;
        applicationToken: ApplicationTokenInterface;
    }

    export { Dippi, TBA };
}
