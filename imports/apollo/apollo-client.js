import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, ApolloProvider } from "@apollo/client";

// Create an HttpLink pointing to your GraphQL endpoint
const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

// Middleware to add custom headers
const customHeadersMiddleware = new ApolloLink((operation, forward) => {
    // Define your custom headers
    const customHeaders = {
        "token": localStorage.getItem("Meteor.loginToken")
    };

    // Use operation.setContext to add the custom headers to the request
    operation.setContext(({ headers }) => ({
        headers: {
            ...headers,
            ...customHeaders,
        },
    }));

    return forward(operation);
});

// Combine the middleware with the HttpLink
const apolloClient = new ApolloClient({
    link: customHeadersMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
});

export {apolloClient};
