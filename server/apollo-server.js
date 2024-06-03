import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'
import typeDefs from '/imports/apollo/schema';
import {resolvers} from "../imports/apollo/resolvers";
import {getUserIdByLoginToken} from "../imports/apollo/meteor-apollo-utils";

const server = new ApolloServer({
        typeDefs,
        resolvers,
    })
;

// see https://www.apollographql.com/docs/apollo-server/data/subscriptions
async function startApolloServer() {
    const {url} = await startStandaloneServer(server, {
        context: async ({req}) => {
            let token = req.headers['token']
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
    });

    console.log(`
    🚀  Apollo Server is running!
    📭  Query at ${url}
  `);

    console.log("See docs for Apollo query explorer here: https://www.apollographql.com/tutorials/lift-off-part1/06-apollo-explorer");
}

startApolloServer();


