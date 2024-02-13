import { ApolloServer } from '@apollo/server';
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda';

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import pino from 'pino';

import { graphql } from '@onem/lib-ts-service';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

interface ServiceContext {
  token?: string;
}

// Setup ApolloServer with schema definition and a set of resolvers.
const apolloServer = new ApolloServer<ServiceContext>({
  introspection: 'production' === `${process.env['NODE_ENV']}` ? false : true,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageProductionDefault({
          graphRef: 'my-graph-id@my-graph-variant',
          footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
  resolvers: graphql.resolvers,
  typeDefs: graphql.typeDefs,
  formatError: (error) => {
    logger.error(error);
    return error;
  },
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  apolloServer,
  handlers.createAPIGatewayProxyEventRequestHandler(),
);
