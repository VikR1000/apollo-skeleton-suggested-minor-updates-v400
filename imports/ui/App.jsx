import React from 'react';
// import { MeteorAccountsLink } from 'meteor/apollo'
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AccountsPage from "./accounts";

const client = new ApolloClient({
  uri: "http://localhost:4000",
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
