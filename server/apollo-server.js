// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import typeDefs from '/imports/apollo/schema';
import {resolvers} from "../imports/apollo/resolvers";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import {getUserIdByLoginToken} from "../imports/apollo/meteor-apollo-utils";

// https://www.apollographql.com/docs/apollo-server/migration/#migrate-from-apollo-server-express
// …in the section following the text:
//     The context function's syntax is similar for the expressMiddleware function:
// https://www.apollographql.com/docs/apollo-server/data/subscriptions

//
// // Create the schema, which will be used separately by ApolloServer and
// // the WebSocket server.
// const schema = makeExecutableSchema({ typeDefs, resolvers });
//
// // Create an Express app and HTTP server; we will attach both the WebSocket
// // server and the ApolloServer to this HTTP server.
// const app = express();
// const httpServer = createServer(app);
//
// // Create our WebSocket server using the HTTP server we just set up.
// const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: '/subscriptions',
// });
// // Save the returned server's info so we can shutdown this server later
// const serverCleanup = useServer({ schema }, wsServer);
//
// // Set up ApolloServer.
// const server = new ApolloServer({
//     schema,
//     plugins: [
//         // Proper shutdown for the HTTP server.
//         ApolloServerPluginDrainHttpServer({ httpServer }),
//
//         // Proper shutdown for the WebSocket server.
//         {
//             async serverWillStart() {
//                 return {
//                     async drainServer() {
//                         await serverCleanup.dispose();
//                     },
//                 };
//             },
//         },
//     ],
// });
//
// await server.start();
// app.use(
//     '/graphql',
//     cors(),
//     express.json(),
//     expressMiddleware(server, {
//         context: async ({req}) => {
//             let token = req.headers['token']
//             let userId = null;
//             try {
//                 if (!!token == "null") {
//                     userId = await getUserIdByLoginToken(token);
//                 }
//             } catch (error) {
//                 console.log('context: ', error)
//             }
//             return {
//                 userId: userId
//             };
//         },
//
//     }),
// );
//
// const PORT = 4000;
// // Now that our HTTP server is fully set up, we can listen to it.
// httpServer.listen(PORT, () => {
//     console.log(`Server is now running on http://localhost:${PORT}/graphql`);
// });










const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context: async ({req}) => {
            let token = req.headers['token']
            let userId = null;
            try {
                if (!!token == "null") {
                    userId = await getUserIdByLoginToken(token);
                }
            } catch (error) {
                console.log('context: ', error)
            }
            return {
                userId: userId
            };
        },

    }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);


