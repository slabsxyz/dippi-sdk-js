'use strict';

const Auth = require('./resources/auth');
const User = require('./resources/user');
const Wallet = require('./resources/wallets');
const TokenBoundAccount = require('./resources/tokenBoundAccount');
const Application = require('./resources/applications');
const ApplicationToken = require('./resources/application-tokens');

/**
 * Represents the main Dippi client class.
 */
class Dippi {
    /**
    * Initializes a new instance of the Dippi class.
    * 
    * @param {Object} config - Configuration object.
    * @param {string} config.appToken - Dippi Application token.
    * @param {string} config.appId - Dippi Application ID.
    * @param {string} config.url - Dippi API URL.
    */
    constructor(config) {
        this.appToken = config.appToken;
        this.appId = config.appId;
        this.url = config.url;
        this.authToken = config.authToken;
        this.urlReturn = config.urlReturn;

        // Attach resources to the client
        this.auth = new Auth(this);
        this.user = new User(this);
        this.wallet = new Wallet(this);
        this.application = new Application(this);
        this.applicationToken = new ApplicationToken(this);
    }

    /**
     * Updates the authentication token.
     * 
     * @param {string} newAuthToken - New authentication token.
     */
    setAuthToken(newAuthToken) {
        this.authToken = newAuthToken;
    }

}

/**
 * Represents the Token Bound Account (TBA) class.
 */
class TBA {  
    /**
    * Initializes a new instance of the TBA class.
    * 
    * @param {Object} config - Configuration object.
    * @param {string} config.appToken - Dippi authentication token.
    * @param {string} config.appId - Dippi application ID.
    * @param {string} config.url - Dippi API URL.
    */
    constructor(config) {
        this.appToken = config.appToken;
        this.appId = config.appId;
        this.url = config.url;
        this.authToken = config.authToken;

        this.auth = new Auth(this);
        this._tokenBoundAccount = new TokenBoundAccount(this);
    }

    /**
     * Updates the authentication token.
     * 
     * @param {String} newAuthToken - New authentication token.
     */
    async setAuthToken (newAuthToken) {
        this.authToken = newAuthToken
    }
    
    /**
     * Initializes the TBA with the provided parameters.
     * 
     * @typedef InitArgs
     * @type {Object}
     * @param {InitArgs} args - Initialization arguments.
     * @param {string} InitArgs.destinationWallet - Destination wallet address.
     * @param {string} InitArgs.chainId - The ID of the blockchain network.
     * @param {string} [InitArgs.gasLimit] - The maximum amount of gas that the transaction is allowed to use.
     * @param {string} InitArgs.nftContract - NFT contract address.
     * @param {string} InitArgs.nftId - NFT ID.
     * 
     * @returns {Promise<Object>} - The result of the initialization.
     */
    async init(args) {
        const { accessToken } = await this.auth.login();
        this.authToken = accessToken
        return this._tokenBoundAccount.init(args);
    }


    /**
     * @deprecated Use {@link createAccount} instead.
     * Creates a TokenBoundAccount.
     * a token-bound account is created for the NFT with the provided NFT token ID.
     * 
     * @returns {Promise<Object>} - The result of the creation.
     */ 
    async create() {
        return this._tokenBoundAccount.create();
    }

    /**
     * Computes Token Bound Account address.
     * 
     * @returns {Promise<string>} - The result of the computed address.
     */
    async computeTBAAddress() {
        return this._tokenBoundAccount.getTBAComputedAddress();
    }

    /**
     * Estimates gas for creating a Token Bound Account.
     * 
     * @returns {Promise<string>} - The result of the creation.
     */
    async estimateGas() {
        return this._tokenBoundAccount.estimateGas();
    }

    /**
     * Signs the transaction for creating a Token Bound Account.
     * 
     * @returns {Promise<string>} - The signed transaction.
     */
    async signCreateAccountTransaction() {
        return this._tokenBoundAccount.signCreateAccountTransaction();
    }

    /**
     * Sends the transaction to create a Token Bound Account.
     * 
     * @returns {Promise<string>} - The result of the transaction.
     */
    async createAccount() {
        return this._tokenBoundAccount.createAccount();
    }
}

module.exports = { Dippi, TBA };