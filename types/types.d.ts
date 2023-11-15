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

  interface TBA {
    init(args: InitArgs): Promise<any>;
    create(): Promise<any>;
    estimateGas(): Promise<string>;
    signCreateTransaction(): Promise<string>;
    sendCreateTransaction(): Promise<string>;
    setAuthToken(newAuthToken: string): Promise<void>;
  }

  class Dippi {
    constructor(config: DippiOptions);
    setAuthToken(newAuthToken: string): void;
    auth: any;
    user: any;
    wallet: any;
    application: any;
    applicationToken: any;
  }

  export { Dippi, TBA };
}
