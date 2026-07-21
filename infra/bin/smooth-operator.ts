import * as cdk from 'aws-cdk-lib';
import { SmoothOperatorCertificateStack } from '../lib/certificate-stack';
import { SmoothOperatorStack } from '../lib/smooth-operator-stack';

const app = new cdk.App();

const domainName = 'smooth-operator.io';
const hostedZoneId = 'Z08786882ATLVA3UQE36J';
const previewPassword = process.env.SMOOTH_OPERATOR_PREVIEW_PASSWORD || 'SMOOTH2026';

// Certificate must be in us-east-1 for CloudFront
const certStack = new SmoothOperatorCertificateStack(app, 'SmoothOperatorCertificateStack', {
  domainName,
  hostedZoneId,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT || '030760499811',
    region: 'us-east-1'
  },
  crossRegionReferences: true
});

// Main stack in eu-central-1 (dedicated empty region)
new SmoothOperatorStack(app, 'SmoothOperatorStack', {
  domainName,
  hostedZoneId,
  certificateArn: certStack.certificateArn,
  previewPassword,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT || '030760499811',
    region: 'eu-central-1'
  },
  crossRegionReferences: true
});

app.synth();
