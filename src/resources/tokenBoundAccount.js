/**
 * Represents a Token Bound Account.
 */
class TokenBoundAccount {

    /**
     * Initializes the TokenBoundAccount with a given client.
     * 
     * @constructor
     * @param {Object} client - Contains configurations for DippiClient including authToken.
     */
    constructor(client) {
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
    async init (data) {
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
    async estimateGas() {
        let data = {
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

    /**
     * @deprecated This method will be removed in future versions. Use {@link createAccount} instead.
     * Creates a token bound account. There are two scenarios covered:
     * 1. If NFT contract, destination wallet, and NFT ID are provided, it creates a token bound account for the specified NFT.
     * 2. If only destination wallet is provided, it drops an NFT and then creates a token bound account.
     * 
     * @returns {Promise<Object>} Response from the API call.
     * @throws {Error} Throws an error if parameters are missing or if there's an issue with the fetch request.
     */
    async create () {
        let data = this;
        if (data.nftContract && data.destinationWallet && data.nftId) {
            
            let params = {
                'nftContract':data.nftContract,
                'destinationWallet':data.destinationWallet,
                'nftId':data.nftId,
            }

            try {
                const response = await fetch(
                    `${this.client.url}/v1/wallets/create-token-bound-account`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.client.authToken}`
                        },
                        body: JSON.stringify(params),
                    }
                )
                
                return await response.json();
            } catch (error) {
                throw error;
            }
            
        } else if (data.destinationWallet) {
            let params = {
                'destinationWallet':data.destinationWallet,
            }

            const response = await fetch(
                `${this.client.url}/v1/wallets/drop-nft-and-create-token-bound-account`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.client.authToken}`
                    },
                    body: JSON.stringify(params),
                }
            )
            return await response.json();
        }else {
            return `Missing parameters: {nftContract: ${this.nftContract}, destinationWallet: ${this.destinationWallet}, nftId: ${this.nftId}`;
        }
        
    }

    /**
     * Sends a request to retrieve Token Bound Account (TBA) computed address.
     * 
     * TBAClient.init() takes care of initializing these parameters, they're here
     * to provide a description of the data needed to compute a TBA address.
     * @param {Object} data - The parameters required to compute a TBA address.
     * @param {string} data.privateKey - Wallet Private Key.
     * @param {string} data.implementation - The address of the implementation contract.
     * @param {number} data.chainId - The ID of the blockchain network.
     * @param {string} data.tokenContract - The address of the token contract.
     * @param {number} data.tokenId - The ID of the token.
     * @returns {Promise<string>} The signed transaction as a string.
     * @throws {Error} Throws an error if there's an issue with the fetch request or missing parameters.
     */
    async getTBAComputedAddress() {
        let data = {
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
            if (!data[field] && (field === 'tokenId' && data[field] == null)) {
                throw new Error(`Missing required field: ${field} to compute TBA address`);
            }
        }

        try {
            const response = await fetch(
                `${this.client.url}/v1/wallets/get-tba-computed-address`,
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
                throw new Error(error.message || 'Error computing TBA address');
            }
            return await response.text();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sends a request to sign a Token Bound Account (TBA) creation transaction.
     * 
     * TBAClient.init() takes care of initializing these parameters, they're here
     * to provide a description of the data needed to sign a transaction.
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
    async signCreateAccountTransaction() {
        let data = {
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
                `${this.client.url}/v1/wallets/sign-tba-account-creation`,
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
                throw new Error(error.message || 'Error signing account creation transaction');
            }
            return await response.text();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sends a Token Bound Account (TBA) creation transaction.
     * 
     * TBAClient.init() takes care of initializing these parameters, they're here
     * to provide a description of the data needed to sign a transaction.
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
    async sendCreateAccountTransaction() {
        let data = {
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
                throw new Error(`Missing required field: ${field} to send create account transaction`);
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
                throw new Error(error.message || 'Error sending account creation transaction');
            }
            return await response.text();
        } catch (error) {
            throw error;
        }
    }

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
    async createAccount() {
        let data = {
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

module.exports = TokenBoundAccount;