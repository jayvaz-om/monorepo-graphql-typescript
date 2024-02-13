import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import express from 'express';
import pino from 'pino';
import http from 'http';
import cors from 'cors';

import { graphql } from '@onem/lib-ts-service';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
});

interface ServiceContext {
  token?: string;
}

async function main() {
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

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
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    resolvers: graphql.resolvers,
    typeDefs: graphql.typeDefs,
    formatError: (error) => {
      logger.error(error);
      return error;
    },
  });
  // Ensure we wait for our server to start
  await apolloServer.start();

  app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(apolloServer));

  app.get('/', (_req, res) =>
    res.send(
      `🔥 Server is running in <b>${app.settings.env}</b> mode...<br/>📈
            <a href="/graphql">View GraphQL server</a>`,
    ),
  );

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  logger.info(`🚀 Server ready at http://localhost:4000/`);
}

main().then();
