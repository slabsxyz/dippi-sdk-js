export interface Client {
    url: string;
    authToken: string;
}

export interface InitData {
    privateKey: string;
    destinationWallet: string;
    chainId: string;
    gasLimit: string;
    nftContract: string;
    nftId: string;
}

export interface TokenBoundAccountInterface {
    client: Client;
    nftContract: string | null;
    destinationWallet: string | null;
    nftId: string | null;
    gasLimit: string | null;
    maxFeePerGas: string | null;
    chainId: string | null;
    privateKey: string | null;
    init(data: InitData): Promise<void>;
    estimateGas(): Promise<string>;
    createAccount(): Promise<string>;
}
