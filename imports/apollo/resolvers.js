import {LinksCollection} from "../api/links";

const resolvers = {
    Query: {
        getLink: async function findLinkById(parent, args, contextValue) {
            // CONTEXT IS AVAILABLE
            return await LinksCollection.findOne(args.id);
        },
        getLinks: async function (parent, args, contextValue) {
            // CONTEXT IS AVAILABLE
            return await LinksCollection.find().fetch()
        }
    }
};

export {
    resolvers
};