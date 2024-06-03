// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import typeDefs from '/imports/apollo/schema';
import {resolvers} from "../imports/apollo/resolvers";
import {getUserIdByLoginToken} from "../imports/apollo/meteor-apollo-utils";


// https://www.apollographql.com/docs/apollo-server/migration/#migrate-from-apollo-server-express
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
            debugger;
            let userId = null;
            try {
                if (!!token) {
                    userId = await getUserIdByLoginToken(token)
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





// import {ApolloServer} from '@apollo/server';
// import {startStandaloneServer} from '@apollo/server/standalone'
// import typeDefs from '/imports/apollo/schema';
// import {resolvers} from "../imports/apollo/resolvers";
// import {getUserIdByLoginToken} from "../imports/apollo/meteor-apollo-utils";
// import {createServer} from 'http';
// import { expressMiddleware } from '@apollo/server/express4';
// import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
// import {makeExecutableSchema} from '@graphql-tools/schema';
// import {WebSocketServer} from 'ws';
// import {useServer} from 'graphql-ws/lib/use/ws';
// import express from "express";
// import cors from 'cors';
//
//
//
// //https://www.apollographql.com/docs/apollo-server/data/subscriptions/
// const app = express()
// app.use(cors());
//
// const httpServer = createServer(app);
// const schema = makeExecutableSchema({typeDefs, resolvers});
// // Creating the WebSocket server
// const wsServer = new WebSocketServer({
//     // This is the `httpServer` we created in a previous step.
//     server: httpServer,
//     // Pass a different path here if app.use
//     // serves expressMiddleware at a different path
//     // path: '/subscriptions',
//
// });
//
// const serverCleanup = useServer({ schema }, wsServer);
//
// const server = new ApolloServer({
//     schema,
//     context: async ({req}) => {
//         let token = req.headers['token']
//         debugger;
//         let userId = null;
//         try {
//             if (!!token) {
//                 userId = await getUserIdByLoginToken(token)
//             }
//         } catch (error) {
//             console.log('context: ', error)
//         }
//         return {
//             userId: userId
//         };
//     },
//     plugins: [
//         // Proper shutdown for the HTTP server.
//         ApolloServerPluginDrainHttpServer({httpServer}),
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
// server.start().then(() => {
//     server.applyMiddleware({
//         app: WebApp.connectHandlers,
//         cors: true,
//         path: "/graphql",
//     });
// });
//
//
// app.use('/graphql', express.json(), expressMiddleware(server));
//
// const PORT = 4000;
// // Now that our HTTP server is fully set up, we can listen to it.
// httpServer.listen(PORT, () => {
//     console.log(`Server is now running on http://localhost:${PORT}/graphql`);
// });


// Hand in the schema we just created and have the
// WebSocketServer start listening.
// const serverCleanup = useServer({ schema }, wsServer);
//
//
// const server = new ApolloServer({
//         typeDefs,
//         resolvers,
//     })
// ;
//
// // see https://www.apollographql.com/docs/apollo-server/data/subscriptions
// async function startApolloServer() {
//     const {url} = await startStandaloneServer(server, {
//         context: async ({req}) => {
//             let token = req.headers['token']
//             let userId = null;
//             try {
//                 if (!!token) {
//                     userId = await getUserIdByLoginToken(token)
//                 }
//             } catch (error) {
//                 console.log('context: ', error)
//             }
//             return {
//                 userId: userId
//             };
//         },
//     });
//
//     console.log(`
//     🚀  Apollo Server is running!
//     📭  Query at ${url}
//   `);
//
//     console.log("See docs for Apollo query explorer here: https://www.apollographql.com/tutorials/lift-off-part1/06-apollo-explorer");
// }
//
// startApolloServer();


