export interface Error {
    error:boolean
    code: string;
    message: string;
}

export interface ClientAuth {
    url: string;
    appToken: string;
    appId: string;
    authToken: string;
    urlReturn?: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface GetUrlResponse {
    url: string;
}

export interface SignInPayload {
    email: string;
    password: string;
    token: string;
    applicationId: string;
    countryCode: string;
}

export interface ResetPasswordPayload {
    email: string;
}

export interface ChangePasswordPayload {
    userEmail: string;
    oldPassword: string;
    password: string;
    repeatedPassword: string;
}

export interface SigninResponseBody {
    accessToken: string;
    refreshToken: string;
}

export interface UserCreatePayload {
    email: string;
    applicationId: string;
    password: string;
    authType: string;
    phone: string;
}

export interface UserData {
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



export interface UserResponseBody {
    user: UserData;
    walletAddress: string;
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
    client: Client;
    getProfile(id: string): Promise<UserData | Error>;
    updateProfile(data: any): Promise<UserResponseBody | Error>; // TODO: Replace 'any' with the actual types of 'data'.
    createProfile(data: UserCreatePayload): Promise<UserData | Error>;
    authenticate(data: SignInPayload): Promise<UserResponseBody  | Error>;
    resetPassword(data: ResetPasswordPayload): Promise<any>;
    changePassword(data: ChangePasswordPayload): Promise<any>;
}

export interface WalletCreatePayload {
    ownerId: string;
    walletType: string;
    isTestNet: boolean;
    storeOption: string; // email
    userCode: string;
    name: string;
    fromMnemonic: boolean;
    mnemonicPhrase: string;
    fromPrivateKey: boolean;
    privateKey: string;
    useRecoveryPhrase: boolean;
    recoveryPhrase: string;
    repeatedRecoveryPhrase: string;
    useKeyppiProtocol: boolean;
    useKeyppiTransactionInfluenciableWallets: boolean;
    transactionInfluenciableWallets: string;
    acceptTermsAndConditions: boolean;
    environment: string;
}

export interface WalletGetNFTsPayload {
    address: string;
    chainId: number;
}

export interface OwnedNftsResponse {
    /** The NFTs owned by the provided address. */
    readonly ownedNfts: any[];
    /**
     * Pagination token that can be passed into another request to fetch the next
     * NFTs. If there is no page key, then there are no more NFTs to fetch.
     */
    readonly pageKey?: string;
    /** The total count of NFTs owned by the provided address. */
    readonly totalCount: number;
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

// TODO: Check warning about not being used. Remove it if not necessary
interface NFTResponseBody {
    ownedNfts: any;
    totalCount: number;
}

export interface Wallet {
    client: Client;
    create(data: WalletCreatePayload): Promise<WalletResponseBody>;
    list(): Promise<WalletResponseBody[]>;
    retrieve(id: string): Promise<WalletResponseBody>;
    update(
        id: string,
        data: WalletUpdatePayload,
    ): Promise<WalletUpdateResponseBody>;
    recovery(
        id: string,
        data: WalletRecoveryPayload,
    ): Promise<WalletRecoveryResponseBody>;
    getBalance(id: string): Promise<WalletResponseBody>;
    balance(id: string): Promise<any>;
    getNFTs(data: WalletGetNFTsPayload): Promise<OwnedNftsResponse>;
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
    update(
        id: string | number,
        data: ApplicationUpdatePayload,
    ): Promise<ApplicationResponseBody>;
}

// TODO: Check warning about not being used. Remove it if not necessary
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
    authToken?: string;
    urlReturn?: string;
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

export interface InitArgs {
    privateKey: string;
    destinationWallet: string;
    chainId: string;
    gasLimit: string;
    nftContract: string;
    nftId: string;
}
