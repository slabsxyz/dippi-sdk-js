
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
    }

    async setAuthToken (newAuthToken) {
        this.authToken = newAuthToken
    }
}
