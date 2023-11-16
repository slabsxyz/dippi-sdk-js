interface Client {
    url: string;
    authToken: string;
}

interface InitData {
    privateKey: string;
    destinationWallet: string;
    chainId: string;
    gasLimit: string;
    nftContract: string;
    nftId: string;
}

interface EstimateGasData {
    privateKey: string;
    implementation: string;
    chainId: string;
    tokenContract: string;
    tokenId: string;
    gasLimit: string;
    maxFeePerGas: string;
}

/**
 * Represents a Token Bound Account.
 */
class TokenBoundAccount {
    client: Client;
    nftContract: string | null;
    destinationWallet: string | null;
    nftId: string | null;
    gasLimit: string | null;
    maxFeePerGas: string | null;
    chainId: string | null;
    privateKey: string | null;
    [key: string]: string | null | Client | (() => Promise<string>) | (() => Promise<any>);

    /**
     * Initializes the TokenBoundAccount with a given client.
     * 
     * @constructor
     * @param {Object} client - Contains configurations for DippiClient including authToken.
     */
    constructor(client: Client) {
        this.client = client;
        this.nftContract = null;
        this.destinationWallet = null;
        this.nftId = null;
        this.gasLimit = null;
        this.maxFeePerGas = null;
        this.chainId = null;
        this.privateKey = null;
    }

    /**
     * Initializes the TokenBoundAccount properties with provided data.
     * 
     * @param {Object} data - Contains properties for TokenBoundAccount.
     * @param {string} data.privateKey - Wallet private key (to instantiate contract and pay for gas fees).
     * @param {string} data.destinationWallet - Destination wallet address.
     * @param {string} data.chainId - The ID of the blockchain network.
     * @param {string} data.gasLimit - The maximum amount of gas that the transaction is allowed to use.
     * @param {string} data.nftContract - NFT drop contract address.
     * @param {string} data.nftId - NFT Token ID.
     */
    async init (data: InitData) {
        for (let key in data) {
            // If the instance (TokenBoundAccount) has this property, then set its value
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }

    /**
     * Fetches the estimated gas for a Token Bound Account (TBA) creation transaction.
     * 
     * TBAClient.init() takes care of initializing these parameters, they're here
     * to provide a description of the data needed to estimate gas.
     * @param {Object} data - The parameters required to estimate gas for a TBA creation transaction.
     * @param {string} data.privateKey - Wallet Private Key.
     * @param {string} data.implementation - The address of the implementation contract.
     * @param {number} data.chainId - The ID of the blockchain network.
     * @param {string} data.tokenContract - The address of the token contract.
     * @param {number} data.tokenId - The ID of the token.
     * @returns {Promise<string>} The estimated gas as a string.
     * @throws {Error} Throws an error if there's an issue with the fetch request or missing parameters.
     */
    async estimateGas(): Promise<string> {
        if (!this.privateKey) {
            throw new Error('Private key is missing');
        }
        if (!this.destinationWallet) {
            throw new Error('Destination wallet is missing');
        }
        if (!this.chainId) {
            throw new Error('Chain ID is missing');
        }
        if (!this.nftContract) {
            throw new Error('NFT contract is missing');
        }
        if (!this.nftId) {
            throw new Error('NFT ID is missing');
        }
        let data: EstimateGasData = {
            privateKey: this.privateKey,
            implementation: this.destinationWallet,
            chainId: this.chainId,
            tokenContract: this.nftContract,
            tokenId: this.nftId,
            gasLimit: "",
            maxFeePerGas: "",
        };
        
        const requiredFields = ['privateKey', 'implementation', 'chainId', 'tokenContract', 'tokenId'];
        
        for (let field of requiredFields) {
            if (!data[field]) {
                throw new Error(`Missing required field: ${field} to estimate gas for account creation.`);
            }
        }        

        try {
            const response = await fetch(
                `${this.client.url}/v1/wallets/get-gas-tba-account-creation`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.client.authToken}`
                    },
                    body: JSON.stringify(data), // Updated to include the specific fields in the payload
                }
            );
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error estimating gas');
            }
            const textResponse = await response.text();
            const responseObj = JSON.parse(textResponse);
            this.gasLimit = responseObj.hex ? responseObj.hex : "0";
            return textResponse; // Assuming the response is a string representation of the estimated gas
        } catch (error) {
            throw error;
        }
    }

    // ... rest of the class methods ...

    /**
     * Sends a request to sign a Token Bound Account (TBA) creation transaction.
     * 
     * TBAClient.init() takes care of initializing these parameters, they're here
     * to provide a description of the data needed to send a transaction.
     * @param {Object} data - The parameters required to sign a TBA creation transaction.
     * @param {string} data.privateKey - Wallet Private Key.
     * @param {string} data.implementation - The address of the implementation contract.
     * @param {number} data.chainId - The ID of the blockchain network.
     * @param {string} data.gasLimit - The maximum amount of gas that the transaction is allowed to use.
     * @param {string} data.maxFeePerGas - The maximum fee per gas.
     * @param {string} data.tokenContract - The address of the token contract.
     * @param {number} data.tokenId - The ID of the token.
     * @returns {Promise<string>} The signed transaction as a string.
     * @throws {Error} Throws an error if there's an issue with the fetch request or missing parameters.
     */
    async createAccount(): Promise<string> {
        if (!this.privateKey) {
            throw new Error('Private key is missing');
        }
        if (!this.destinationWallet) {
            throw new Error('Destination wallet is missing');
        }
        if (!this.chainId) {
            throw new Error('Chain ID is missing');
        }
        if (!this.gasLimit) {
            throw new Error('Gas limit is missing');
        }
        if (!this.nftContract) {
            throw new Error('NFT contract is missing');
        }
        if (!this.nftId) {
            throw new Error('NFT ID is missing');
        }
        let data: EstimateGasData = {
            privateKey: this.privateKey,
            implementation: this.destinationWallet,
            chainId: this.chainId,
            gasLimit: this.gasLimit,
            maxFeePerGas: this.gasLimit,
            tokenContract: this.nftContract,
            tokenId: this.nftId,
        };

        const requiredFields = ['privateKey', 'implementation', 'chainId', 'gasLimit', 'maxFeePerGas', 'tokenContract', 'tokenId'];

        for (let field of requiredFields) {
            if (!data[field]) {
                throw new Error(`Missing required field: ${field} to sign create account transaction`);
            }
        }

        try {
            const response = await fetch(
                `${this.client.url}/v1/wallets/send-tba-account-creation`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.client.authToken}`
                    },
                    body: JSON.stringify(data), // Updated to include the specific fields in the payload
                }
            );
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error creating tba');
            }
            
            return await response.text();
        } catch (error) {
            throw error;
        }
    }
}

export default TokenBoundAccount;
