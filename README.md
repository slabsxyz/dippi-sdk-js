# Dippi SDK for JS

This is the Dippi SDK for JavaScript, providing a wrapper around the Dippi API.

## Installation

```bash
npm i @dippixyz/sdk
```

## Usage

Go to [client.dippi.xyz](https://client.dippi.xyz) to sign up and obtain an `appToken` and `appId`.

## Class Definitions

### Dippi

-   `appToken: string;`
-   `appId: string;`
-   `url: string;`
-   `authToken: string;`
-   `urlReturn: string;`
-   `auth: AuthInterface;`
-   `user: UserInterface;`
-   `wallet: WalletInterface;`
-   `application: ApplicationInterface;`
-   `applicationToken: ApplicationTokenInterface;`

### TBA

-   `appToken: string;`
-   `appId: string;`
-   `url: string;`
-   `authToken: string;`
-   `auth: Auth;`
-   `_tokenBoundAccount: TokenBoundAccountInterface;`

### Dippi Client

To use the Dippi Client, follow the steps below:

1. **Initialization**:

    ```js
    const { Dippi, TBA } = require('@dippixyz/sdk');

    const dippiClient = new Dippi({
        appToken: [appToken],
        appId: [appId],
        url: 'https://api.dippi.xyz',
    });
    ```

2. **Authentication**:

    ```js
    const { accessToken } = await dippiClient.auth.login();
    dippiClient.setAuthToken(accessToken);
    ```

3. **Fetching User Profile**:

    ```js
    const userProfile = await dippiClient.user.getProfile(userId);
    ```

4. **Working with Wallets, Applications, and Application Tokens**:

    ```js
    const userWallets = await dippiClient.wallet.list();
    const userApplications = await dippiClient.application.list();
    const userApplicationToken = await dippiClient.applicationToken.retrieve(
        applicationId,
    );
    ```

### Token Bound Account (TBA)

To utilize the Token Bound Account (TBA) Class:

1. **Initialization**:

    ```js
    const tbaConfig = {
        appToken: [appToken],
        appId: [appId],
        url: 'https://api.dippi.xyz',
        auth: dippiClient.auth, // Passing the auth instance from Dippi client
    };

    const tba = new TBA(tbaConfig);
    ```

2. **Initialization and Creation for TBA**:

    ```js
    const initArgs = {
        destinationWallet: 'destinationWalletAddress',
        nftContract: 'nftContractAddress',
        nftId: 'nftId',
    };

    await tba.init(initArgs);
    await tba.create();
    ```

### Example Application

Below is an example of how you can utilize the Dippi SDK and the TBA feature in a simple Node.js application.

```js
const { Dippi, TBA } = require('@dippixyz/sdk');

// Initialize Dippi Client
const dippiClient = new Dippi({
    appToken: 'yourAppToken',
    appId: 'yourAppId',
    url: 'https://api.dippi.xyz',
});

(async () => {
    // Authenticate
    const { accessToken } = await dippiClient.auth.login();
    dippiClient.setAuthToken(accessToken);

    // Fetch User Profile
    const userId = 'yourUserId';
    const userProfile = await dippiClient.user.getProfile(userId);

    // List User Wallets
    const userWallets = await dippiClient.wallet.list();

    // List User Applications
    const userApplications = await dippiClient.application.list();

    // Retrieve User Application Token
    const tokenId = 'yourTokenId';
    const userApplicationToken = await dippiClient.applicationToken.retrieve(
        tokenId,
    );

    // Initialize TBA
    const tbaConfig = {
        appToken: 'yourAppToken',
        appId: 'yourAppId',
        url: 'https://api.dippi.xyz',
        auth: dippiClient.auth,
        _tokenBoundAccount: {},
    };

    const tba = new TBA(tbaConfig);

    // Initialize and Create TBA
    const initArgs = {
        destinationWallet: 'destinationWalletAddress',
        chainId: 'chain id',
        nftContract: 'nftContractAddress',
        nftId: 'nftId',
    };

    await tba.init(initArgs);
    await tba.createAccount();

    console.log('TBA created successfully!');
})();
```

Make sure to replace the placeholders in the code with your actual data. Save this code in a file, say `app.js`, and run it using `node app.js`.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

-   Hat tip to anyone whose code was used
-   Inspiration
-   etc

```

```
