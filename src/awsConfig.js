// src/aws-config.js
import AWS from 'aws-sdk';

const REGION = 'us-east-1';
const BUCKET = 'learning-s3-bucket-deep';
const USER_POOL_ID = 'us-east-1:27568bc8-ce88-4f15-948f-fe15bb5b1e26';

// Configure AWS SDK
AWS.config.update({
  region: REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'YOUR_IDENTITY_POOL_ID', // You'll need this if you want to authenticate users
  }),
});

// Set up S3 instance
const s3 = new AWS.S3({
  params: { Bucket: BUCKET },
});

export { s3 };

