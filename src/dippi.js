'use strict';

const Auth = require('./resources/auth');
const User = require('./resources/user');
const Wallet = require('./resources/wallets');
const TokenAccountFunc = require('./resources/TokenAccountFunc');
const Application = require('./resources/applications');
const ApplicationToken = require('./resources/application-tokens');

class Dippi {
    /*
    * @param {Object} config
    * @param {String} config.email
    * @param {String} config.password
    * @param {String} config.url
    * @param {String} config.authToken
    * @param {String} config.clientId
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
        this.TokenAccountFunc = new TokenAccountFunc(this);
        this.application = new Application(this);
        this.applicationToken = new ApplicationToken(this);
    }

    async setAuthToken (newAuthToken) {
        this.authToken = newAuthToken
    }
}

module.exports = Dippi;