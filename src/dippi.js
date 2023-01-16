'use strict';

import {
    Auth,
    User,
    Wallet,
    Application,
    ApplicationToken,
} from './resources';

export class Dippi {
    /*
    * @param {Object} config
    * @param {String} config.email
    * @param {String} config.password
    * @param {String} config.url
    * @param {String} config.authToken
    * @param {String} config.clientId
    */
    constructor(config) {
        this.email = config.email;
        this.password = config.password;
        this.url = config.url;
        this.authToken = config.authToken;

        // Attach resources to the client
        this.auth = new Auth(this);
        this.user = new User(this);
        this.wallet = new Wallet(this);
        this.application = new Application(this);
        this.applicationToken = new ApplicationToken(this);
    }

    async setAuthToken (newAuthToken) {
        this.authToken = newAuthToken
    }
}
