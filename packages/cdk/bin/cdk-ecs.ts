#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiEcsStack } from '../lib/ApiEcsStack';

const app = new cdk.App();
new ApiEcsStack(app, 'ApiEcsStack', {});
