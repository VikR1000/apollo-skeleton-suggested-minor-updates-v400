import React from 'react';
// import { MeteorAccountsLink } from 'meteor/apollo'
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';

import { ApolloClient, HttpLink, InMemoryCache, ApolloLink, ApolloProvider } from "@apollo/client";

import AccountsPage from "./accounts";


// Create an HttpLink pointing to your GraphQL endpoint
const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

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
const client = new ApolloClient({
    link: customHeadersMiddleware.concat(httpLink),
    cache: new InMemoryCache(),
});


export default client;


export const App = () => (
  <ApolloProvider client={client}>
      <AccountsPage/>
    <div>
      <h1>Welcome to Meteor! ☄</h1>
      <Hello/>
      <Info/>
    </div>
  </ApolloProvider>
);
