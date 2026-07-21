import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

interface SmoothOperatorStackProps extends cdk.StackProps {
  domainName: string;
  hostedZoneId: string;
  certificateArn: string;
  previewPassword: string;
}

export class SmoothOperatorStack extends cdk.Stack {
  public readonly siteBucketName: string;
  public readonly distributionId: string;
  public readonly distributionDomainName: string;

  constructor(scope: Construct, id: string, props: SmoothOperatorStackProps) {
    super(scope, id, props);

    const account = cdk.Stack.of(this).account;

    // S3 bucket for static site — private, no public access
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: `${props.domainName.replace(/\./g, '-')}-site-${account}-${this.region}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED
    });

    // Hosted zone lookup
    const hostedZone = route53.HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: props.hostedZoneId,
      zoneName: props.domainName
    });

    // CloudFront Function for basic-auth preview protection
    const authFunction = new cloudfront.Function(this, 'BasicAuthFunction', {
      functionName: `${this.stackName}-basic-auth`,
      code: cloudfront.FunctionCode.fromInline(`
        function handler(event) {
          var request = event.request;
          var headers = request.headers;
          var authHeader = headers.authorization ? headers.authorization.value : '';
          // base64 of preview:${props.previewPassword}
          var expected = 'Basic ' + '${Buffer.from(`preview:${props.previewPassword}`).toString('base64')}';
          if (authHeader === expected) {
            return request;
          }
          return {
            statusCode: 401,
            statusDescription: 'Unauthorized',
            headers: {
              'www-authenticate': { value: 'Basic realm="Smooth Operator Preview"' }
            }
          };
        }
      `),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      comment: 'Basic auth protection for Smooth Operator preview'
    });

    // CloudFront distribution
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      domainNames: [props.domainName, `www.${props.domainName}`],
      certificate: acm.Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn),
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: authFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST
          }
        ],
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD
      },
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0)
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0)
        }
      ],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100
    });

    // Route53 records
    new route53.ARecord(this, 'ARecord', {
      zone: hostedZone,
      recordName: props.domainName,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
    });

    new route53.ARecord(this, 'WwwARecord', {
      zone: hostedZone,
      recordName: `www.${props.domainName}`,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
    });

    new route53.AaaaRecord(this, 'AaaaRecord', {
      zone: hostedZone,
      recordName: props.domainName,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
    });

    new route53.AaaaRecord(this, 'WwwAaaaRecord', {
      zone: hostedZone,
      recordName: `www.${props.domainName}`,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
    });

    // Outputs
    this.siteBucketName = siteBucket.bucketName;
    this.distributionId = distribution.distributionId;
    this.distributionDomainName = distribution.distributionDomainName;

    new cdk.CfnOutput(this, 'SiteBucketName', {
      value: siteBucket.bucketName,
      description: 'S3 bucket for static site'
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution ID'
    });

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'CloudFront distribution domain name'
    });

    new cdk.CfnOutput(this, 'PreviewUrl', {
      value: `https://${props.domainName}`,
      description: 'Password-protected preview URL'
    });

    new cdk.CfnOutput(this, 'PreviewCredentials', {
      value: `preview / ${props.previewPassword}`,
      description: 'Preview basic auth credentials'
    });
  }
}
