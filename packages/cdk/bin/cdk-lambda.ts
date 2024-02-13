#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiLambdaStack } from '../lib/ApiLambdaStack';

const app = new cdk.App();
new ApiLambdaStack(app, 'CdkApiLambdaStackStack', {});
