import {
    User as UserInterface,
    Auth as AuthInterface,
    DippiInstance,
    Wallet as WalletInterface,
    Application as ApplicationInterface,
    ApplicationToken as ApplicationTokenInterface,
    DippiConfig,
    InitArgs,
} from './interfaces/Dippi';
import { TokenBoundAccountInterface } from './interfaces/TokenBoundAccountInterface';
import {
    Auth,
    User,
    Wallet,
    Application,
    ApplicationToken,
} from './resources/';
import TokenBoundAccount from './resources/tokenBoundAccount';

class Dippi implements DippiInstance {
    appToken: string;
    appId: string;
    url: string;
    authToken: string;
    urlReturn: string;
    auth: AuthInterface;
    user: UserInterface;
    wallet: WalletInterface;
    application: ApplicationInterface;
    applicationToken: ApplicationTokenInterface;

    constructor(config: DippiConfig) {
        this.appToken = config.appToken;
        this.appId = config.appId;
        this.url = config.url;
        this.authToken = config.authToken? config.authToken : '';
        this.urlReturn = config.urlReturn? config.urlReturn : '';

        this.auth = new Auth(this);
        this.user = new User(this);
        this.wallet = new Wallet(this);
        this.application = new Application(this);
        this.applicationToken = new ApplicationToken(this);
    }

    setAuthToken(newAuthToken: string) {
        this.authToken = newAuthToken;
    }
}

class TBA {
    appToken: string;
    appId: string;
    url: string;
    authToken: string;
    auth: Auth;
    _tokenBoundAccount: TokenBoundAccountInterface;

    constructor(config: DippiConfig) {
        this.appToken = config.appToken;
        this.appId = config.appId;
        this.url = config.url? config.url : '';
        this.authToken = config.authToken? config.authToken : '';

        this.auth = new Auth(this);
        this._tokenBoundAccount = new TokenBoundAccount(this);
    }

    async setAuthToken(newAuthToken: string) {
        this.authToken = newAuthToken;
    }

    async init(args: InitArgs) {
        const { accessToken } = await this.auth.login();
        this.authToken = accessToken;
        return this._tokenBoundAccount.init(args);
    }

    async create() {
        return this._tokenBoundAccount.createAccount();
    }

    async estimateGas() {
        return this._tokenBoundAccount.estimateGas();
    }

    async createAccount() {
        return this._tokenBoundAccount.createAccount();
    }
}

export { Dippi, TBA };
