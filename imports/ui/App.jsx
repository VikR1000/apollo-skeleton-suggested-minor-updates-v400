import React from 'react';
// import { MeteorAccountsLink } from 'meteor/apollo'
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import AccountsPage from "./accounts";
import {apolloClient} from '/imports/apollo/apollo-client'
import {ApolloProvider } from "@apollo/client";

export const App = () => (
  <ApolloProvider client={apolloClient}>
      <AccountsPage/>
    <div>
      <h1>Welcome to Meteor! ☄</h1>
      <Hello/>
      <Info/>
    </div>
  </ApolloProvider>
);
