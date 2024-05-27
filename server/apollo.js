import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone'
import {WebApp} from 'meteor/webapp';
import {getUser} from 'meteor/apollo';
import {LinksCollection} from '/imports/api/links';
import typeDefs from '/imports/apollo/schema';
import express from 'express';
import {expressMiddleware} from '@apollo/server/express4';
import {json} from 'body-parser';
import {resolvers} from "../imports/apollo/resolvers";

Meteor.methods({
    'getUserId'() {
        let userId = null
        try {
            userId = Meteor.userId()
        } catch (error) {
            console.log('getUserId: ', error)
        }
        return userId
    }
});


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startApolloServer() {
    const {url} = await startStandaloneServer(server, {
        context: async ({req}) => {
            let userTest = null;
            let userTest2 = null;
            let userTest3 = null;
            let userId = null;
            try {
                userTest = await getUser(req.headers.authorization)
                userTest2 = await Meteor.call(
                    "getUserId"
                );
                userTest3 = await Meteor.users.findOneAsync();
                userId = userTest3._id;
            } catch (error) {
                console.log('context: ', error)
            }
            return {
                userId: userId
            };
            return {
                userId,
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


