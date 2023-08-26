class TokenBoundAccount {

    /**
     * initializes arguments.
     * @constructor
     * @param {object} client - DippiClient configuration {authToken: "AUTHTOKEN"} . 
     */ 

    constructor(client) {
        this.client = client;
        this.nftContract = null
        this.destinationWallet = null
        this.nftId = null
    }

    /**
     * Create create tokenBoundAccount.
     * @create 
     * - Method for the creation of a token bound account 
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
     * initializes arguments.
     * @init
     * @param {string} destinationWallet - Destination wallet address. 
     * @param {string} nftContract - NFT drop contract address (optional).
     * @param {string} nftId - NFT Token ID (mandatory if nftContract is provided)  .
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