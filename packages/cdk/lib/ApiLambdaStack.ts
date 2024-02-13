import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ApiLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apiRequestLambdaRole = new iam.Role(this, 'ApiRequestLambda', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')],
    });

    const apiRequestLambdaHandler = new lambdaNodeJs.NodejsFunction(this, 'ApiRequestLambdaHandler', {
      entry: path.join(path.resolve('..'), 'aws-lambda-service/src/index.ts'),
      handler: 'graphqlHandler',
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(20),
      memorySize: 1024,
      role: apiRequestLambdaRole,
      environment: {
        LOG_LEVEL: 'debug',
      },
      logRetention: cdk.aws_logs.RetentionDays.ONE_WEEK,
      bundling: {
        sourceMap: true,
        sourceMapMode: lambdaNodeJs.SourceMapMode.BOTH,
        target: 'es2020',
      },
    });

    new apigateway.LambdaRestApi(this, 'ApiRequestLambdaApi', {
      handler: apiRequestLambdaHandler,
    });
  }
}
