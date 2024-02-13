import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as apigateway2 from '@aws-cdk/aws-apigatewayv2-alpha';
import * as apigateway2_integrations from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Construct } from 'constructs';
// import path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ApiEcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const image = ecs.ContainerImage.fromAsset('/Users/ayvazj/src/monorepo-graphql-typescript', {
      file: 'packages/aws-ecs-service/Dockerfile',
    });

    const vpc = new ec2.Vpc(this, 'ApiRequestEcsVpc', {});

    const cluster = new ecs.Cluster(this, 'ApiRequestEcsCluster', {
      vpc: vpc,
    });

    // Create a load-balanced Fargate service and make it public
    const ecsService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'ApiRequestEcsFargateService', {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 6, // Default is 1
      taskImageOptions: { image: image },
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: false, // Default is true
    });

    const scalableTarget = ecsService.service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 20,
    });

    scalableTarget.scaleOnCpuUtilization('ApiRequestEcsCpuScaling', {
      targetUtilizationPercent: 50,
    });

    scalableTarget.scaleOnMemoryUtilization('ApiRequestEcsMemoryScaling', {
      targetUtilizationPercent: 50,
    });

    const httpListener = ecsService.loadBalancer.addListener('http-listener', { port: 80 });
    httpListener.addTargets('ecs-server-target', {
      port: 4000,
    });
    const unu = new apigateway2.HttpApi(this, 'HttpProxyPrivateApi', {
      defaultIntegration: new apigateway2_integrations.HttpAlbIntegration('DefaultIntegration', httpListener),
    });
  }
}
