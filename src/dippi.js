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
    * @param {String} config.email - User's email.
    * @param {String} config.password - User's password.
    * @param {String} config.url - API URL.
    * @param {String} config.authToken - Authentication token.
    * @param {String} config.clientId - Client ID.
    */
    constructor(config) {
        this.appToken = config.appToken;
        this.appId = config.appId;
        this.url = config.url;
        this.authToken = config.authToken;

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
     * @param {String} newAuthToken - New authentication token.
     */
    async setAuthToken (newAuthToken) {
        this.authToken = newAuthToken
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
    * @param {String} config.appToken - DippiClient authentication token.
    * @param {String} config.appId - DippiClient application ID.
    * @param {String} config.url - DippiClient API URL.
    * @param {Object} config.auth - DippiClient authentication object.
    * @param {Object} config._tokenBoundAccount - DippiClient Token Bound Account configuration.
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
     * @property {String} destinationWallet - Destination wallet address.
     * @property {String} nftContract - NFT contract address.
     * @property {String} nftId - NFT ID.
     * 
     * @param {InitArgs} args - Initialization arguments.
     * @returns {Promise<Object>} - The result of the initialization.
     */
    async init(args) {
        const { accessToken } = await this.auth.login();
        this.authToken = accessToken
        return this._tokenBoundAccount.init(args);
    } 


    /**
     * Creates a TokenBoundAccount.
     * Delivers an NFT with a token-bound account if a wallet address is provided.
     * If a wallet address, NFT drop contract address, and NFT token ID are provided,
     * a token-bound account is created for the NFT with the provided NFT token ID.
     * 
     * @returns {Promise<Object>} - The result of the creation.
     */ 
    async create() {
        return this._tokenBoundAccount.create();
    }
}

module.exports = { Dippi, TBA };