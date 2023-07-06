# Dippi SDK for JS

This is the Dippi SDK for JavaScript. It is a wrapper around the Dippi API.

## Installation

```bash
npm i @dippixyz/sdk
```

## Usage

```js
const Dippi = require('@dippixyz/sdk');

const dippiClient = new Dippi({
    appToken: process.env.APP_TOKEN,
    appId: process.env.APP_ID,
    url: process.env.CLIENT_URL,
});

const { accessToken } = await dippiClient.auth.login();
dippiClient.setAuthToken(accessToken);

const userProfile = await dippiClient.user.getProfile(id);

const userWallets = await dippiClient.wallet.list();
const userApplicaitons = await dippiClient.application.list();
const userApplicationToken = await dippiClient.applicationToken.retrieve(id);
```
