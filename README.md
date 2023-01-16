# Dippi SDK for JS

This is the Dippi SDK for JavaScript. It is a wrapper around the Dippi API.

## Installation

```bash
npm install @dippi/sdk
```

## Usage

```js
const { Dippi } = require('@dippi/sdk');

const dippiClient = new Dippi();
const { accessToken } = await dippiClient.auth.login('username', 'password');
dippiClient.setAuthToken(accessToken);

const userProfile = await dippiClient.users.getProfile();

const userWallets = await dippiClient.wallets.list();
const userApplicaitons = await dippiClient.applications.list();
const userApplicaitonTokens = await dippiClient.applicationTokens.list();
```
