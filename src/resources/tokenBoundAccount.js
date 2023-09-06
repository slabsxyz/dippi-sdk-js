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
        this.nftContract = null
        this.destinationWallet = null
        this.nftId = null
    }

    /**
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
                console.log('error---->',error)
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
     * Initializes the TokenBoundAccount properties with provided data.
     * 
     * @param {Object} data - Contains properties for TokenBoundAccount.
     * @param {string} data.destinationWallet - Destination wallet address.
     * @param {string} [data.nftContract] - NFT drop contract address. Optional, but if provided nftId is mandatory.
     * @param {string} [data.nftId] - NFT Token ID. Mandatory if nftContract is provided.
     */
    async init (data) {
        for (let key in data) {
            // If the instance (TokenBoundAccount) has this property, then set its value
            if (this.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    
 
}

module.exports = TokenBoundAccount;