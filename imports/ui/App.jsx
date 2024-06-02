import React from 'react';
// import { MeteorAccountsLink } from 'meteor/apollo'
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import AccountsPage from "./accounts";
import {client} from '/imports/ui/apollo-client'
import {ApolloProvider } from "@apollo/client";

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
