# TypeScript GraphQL Service Example

## Technologies in use

- [Apollo GraphQL Server](https://www.apollographql.com/)
- [AWS CDK](https://aws.amazon.com/cdk/)
- [NodeJS](https://nodejs.org/) - Server
- [TypeScript](https://www.typescriptlang.org/) - Dev Language
- [Jest](https://jestjs.io/) - Unit Testing
- [Lerna](https://github.com/lerna/lerna) - Monorepo management
- [Npm](https://www.npmjs.com/) - Npm runner

## Getting Started

1. Clone this repository using SSH:

   `git clone `

2. Install [Node](https://nodejs.org) globally if not already installed

   `brew install node`

3. Install all the project packages

   `npm install`

That's it, you are all set!

## Running the 'GraphQL' Service

1. Run: `npm install`
2. Run: `npm run build` (Compiles all packages)
3. Start the service `npm run start`
4. Navigate to `http://localhost:4000/graphql`

## Project Structure

Breaking down the basic structure and the configurations

```
packages/
  lib-ts-service          // a TypeScript module that contains the business logic of the service.
                          // This package should be agnostic of runtime environment (Lambda, Express, ECS..)

  aws-ecs-service         // Code required to run the service in an AWS ECS container

  aws-lambda-service      // Code required to run the service in an AWS Lambda

  cdk                     // Infrastructure as code required to support the AWS Lambda or ECS services
```

## Testing

Test runner is [jest](https://github.com/facebook/jest).
To run all eligible tests across all packages in the monorepo:

```
npm run test

# run tests in a specific package
npm run test -w @onem/lib-ts-service

```

To run integration tests across all packages in the monorepo:

```
npm run test:integ

# run integ tests in a specific package
npm run test:integ -w @onem/lib-ts-service
```

## Linting, Formatters and Ethics

Tools being used:

- [Prettier](https://github.com/prettier/prettier) - Opinionated Code Formatter.
- [ESlint](https://github.com/eslint/eslint) - Static code analysis tool for identifying and reporting problematic patterns found in JavaScript code.

All tools are configured in project level and takes part during development,
commit, open Pull Requests and in our CI/CD flow.

1. Run Lint: `npm run lint`
2. Run Prettier: `npm run prettier`
3. Run both linter & prettier and fix all problems: `npm run format`

To integrate Prettier in your editor, download this plugin: [for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) / [for WebStorm](https://plugins.jetbrains.com/plugin/10456-prettier)

For WebStorm: To run prettier on auto-save - Go to `.idea/watcherTasks.xml` file and enable it.

## Deploying

This service uses the [aws-cdk](https://aws.amazon.com/cdk/) to deploy into an AWS account.
This readme assumes you have your AWS account setup and the AWS cli configured.

As as best practice services should be deployed into their own AWS accounts

### Bootstrapping

Bootstrapping sets up the AWS account for use with the CDK and has to be performed before
any CDK opertions can be performed. This is a one time task.

```
AWS_PROFILE=YOUR_AWS_PROFILE npm run cdk bootstrap
```

### Deploying the API as a Lambda

```
AWS_PROFILE=YOUR_AWS_PROFILE npm run cdk:lambda deploy
```

### Deploying the API as an ECS service

```
AWS_PROFILE=YOUR_AWS_PROFILE npm run cdk:ecs deploy
```
