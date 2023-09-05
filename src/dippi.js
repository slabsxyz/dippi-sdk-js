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
    * @param {Object} config Configuration object.
    * @param {String} config.email User's email.
    * @param {String} config.password User's password.
    * @param {String} config.url API URL.
    * @param {String} config.authToken Authentication token.
    * @param {String} config.clientId Client ID.
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
        // this.tokenBoundAccount = new TokenBoundAccount(this);
        this.application = new Application(this);
        this.applicationToken = new ApplicationToken(this);
    }

    async setAuthToken (newAuthToken) {
        this.authToken = newAuthToken
    }

}

class TBA {

    
    /**
     * initializes arguments.
     * @constructor
     * @param {string} appToken - DippiClient configuration {authToken: "AUTHTOKEN"} . 
     * @param {string} appId - DippiClient configuration application Id {appId: "APPID"} . 
     * @param {string} url - DippiClient configuration url {url: "dippi.xyz"} . 
     * @param {object} auth - DippiClient configuration auth function {auth()} . 
     * @param {object} _tokenBoundAccount - DippiClient configuration _tokenBoundAccount{_tokenBoundAccount} . 
     */ 
    constructor(config) {
        this.appToken = config.appToken;
        this.appId = config.appId;
        this.url = config.url;
        this.authToken = config.authToken;

        this.auth = new Auth(this);
        this._tokenBoundAccount = new TokenBoundAccount(this);
    }

    

    async setAuthToken (newAuthToken) {
        this.authToken = newAuthToken
    }
    
    /**
     * initializes arguments.
     * @alias init
     * @param {object} { destinationWallet, nftContract, nftId } - An object containing threee parameters: destination wallet, NFT drop contract and NFT id . 
     */ 
    
    async init(args) {
        const { accessToken } = await this.auth.login();
        this.authToken = accessToken
        return this._tokenBoundAccount.init(args);
    } 


     /**
     * create tokenBoundAccount.
     * @alias create
     * - Delivers an NFT with a token bound account if a wallet address is provided.
        If a wallet address, NFT drop contract address and NFT token id are provided, a token bound account is created for the NFT with provided NFT token id.  . 
     */ 
    async create() {
        return this._tokenBoundAccount.create();
    } 




    
}

module.exports = Dippi;
module.exports = TBA;