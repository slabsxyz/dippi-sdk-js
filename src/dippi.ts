import { Auth, User, Wallet, Application, ApplicationToken, DippiInstance, ClientAuth } from './types';

class Dippi implements DippiInstance {
    appToken: string;
    appId: string;
    url: string;
    authToken: string;
    urlReturn: string;
    auth: Auth;
    user: User;
    wallet: Wallet;
    application: Application;
    applicationToken: ApplicationToken;

    constructor(config: ClientAuth) {
        this.appToken = config.appToken;
        this.appId = config.appId;
        this.url = config.url;
        this.authToken = config.authToken;
        this.urlReturn = config.urlReturn;

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
    _tokenBoundAccount: TokenBoundAccount;

    constructor(config: ClientAuth) {
        this.appToken = config.appToken;
        this.appId = config.appId;
        this.url = config.url;
        this.authToken = config.authToken;

        this.auth = new Auth(this);
        this._tokenBoundAccount = new TokenBoundAccount(this);
    }

    async setAuthToken (newAuthToken: string) {
        this.authToken = newAuthToken
    }

    async init(args: InitArgs) {
        const { accessToken } = await this.auth.login();
        this.authToken = accessToken
        return this._tokenBoundAccount.init(args);
    }

    async create() {
        return this._tokenBoundAccount.create();
    }

    async computeTBAAddress() {
        return this._tokenBoundAccount.getTBAComputedAddress();
    }

    async estimateGas() {
        return this._tokenBoundAccount.estimateGas();
    }

    async signCreateAccountTransaction() {
        return this._tokenBoundAccount.signCreateAccountTransaction();
    }

    async createAccount() {
        return this._tokenBoundAccount.createAccount();
    }
}

export { Dippi, TBA };
