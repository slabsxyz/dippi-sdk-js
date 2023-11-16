
export interface ClientAuth {
    url: string;
    appToken: string;
    appId: string;
    urlReturn?: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface GetUrlResponse {
    url: string;
}

export interface UserResponseBody {
    id: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    isVerified: boolean;
    isActive: boolean;
    referralCode: string;
    referrerId: string;
    dipTokenBalance: number;
    dipInitMineTime: Date;
    dipInitMineAmount: number;
    dipInitReferredCount: number;
    currentChallenge: string;
    singupState: string;
    applicationId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Auth {
    client: ClientAuth;
    login(): Promise<TokenPair>;
    getUrl(): Promise<GetUrlResponse>;
}

export interface Client {
    url: string;
    authToken: string;
}

export interface User {
    client: Client; // Replace 'any' with the actual type of 'client' 
    getProfile(id: string): Promise<UserResponseBody>; // Replace 'any' with the actual return type of 'getProfile'
    updateProfile(data: any): Promise<UserResponseBody>; // Replace 'any' with the actual types of 'data' and the return type of 'updateProfile'
}

export interface WalletResponseBody {
    id: string;
    name: string;
    address: string;
    fileId: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface WalletUpdatePayload {
    name: string;
}

export interface WalletUpdateResponseBody {
    id: string;
    name: string;
    address: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface WalletRecoveryPayload {
    recoveryPhrase: string;
}

export interface WalletRecoveryResponseBody {
    privateKey: string;
}

// interface OwnedNft {
    
// }

interface NFTResponseBody {
    ownedNfts: any;
    totalCount: number;
}

export interface Wallet {
    client: Client;
    list(): Promise<WalletResponseBody[]>;
    retrieve(id: string): Promise<WalletResponseBody>;
    update(id: string, data: WalletUpdatePayload): Promise<WalletUpdateResponseBody>;
    recovery(id: string, data: WalletRecoveryPayload): Promise<WalletRecoveryResponseBody>;
    balance(id: string): Promise<any>;
    nfts(id: string): Promise<any>;
    getWalletInfo(id: string, network: string): Promise<any>;
}

export interface ApplicationResponseBody {
    id: string;
    name: string;
    slug: string;
    walletType: string;
    environment: string;
    userAuthType: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApplicationCreatePayload {
    name?: string;
    walletType?: string;
    environment?: string;
    userAuthType?: string;
    ownerId?: string;
}

export interface ApplicationUpdatePayload {
    name?: string;
    walletType?: string;
    environment?: string;
    ownerId?: string;
}

export interface Application {
    client: Client;
    list(): Promise<ApplicationResponseBody[]>;
    create(data: ApplicationCreatePayload): Promise<ApplicationResponseBody>;
    retrieve(id: string | number): Promise<ApplicationResponseBody>;
    update(id: string | number, data: ApplicationUpdatePayload): Promise<ApplicationResponseBody>;
}

interface ApplicationTokenResponseBody {
    id: string;
    applicationId: string;
    createdAt: Date;
}

export interface ApplicationToken {
    client: Client;
    retrieve(id: string | number): Promise<ApplicationResponseBody>;
}

export interface DippiConfig {
    appToken: string;
    appId: string;
    url: string;
    authToken: string;
    urlReturn: string;
}

export interface DippiInstance {
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
}
