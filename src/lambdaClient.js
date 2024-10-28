// lambdaClient.js

import { LambdaClient } from '@aws-sdk/client-lambda';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import * as Secret from './secret/secret';

const IDENTITY_POOL_ID = Secret.IDENTITY_POOL_ID;  
const REGION =  Secret.REGION; 

const lambdaClient = new LambdaClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

export {lambdaClient};
