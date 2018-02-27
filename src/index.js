import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Config from './config';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

/**
 * Allows client to communicate to GraphQL server
 * @type {HttpLink}
 */
const httpLink = new HttpLink({
  uri: Config.serverUrl
});

/**
 * Allows for subscriptions to listen on web socket channel
 * @type {WebSocketLink}
 */
const wsLink = new WebSocketLink({
  uri: Config.subscriptionUrl,
  options: {
    reconnect: true
  }
});

/**
 * Dispatches query to appropriate link (ws or http)
 * @param  {Object} ({ query         } GraphQL query
 * @return {HttpLink | WebsocketLink} appropriate link based on query type
 */
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

/**
 * GraphQL client for making requests to GraphQL server
 * @type {ApolloClient}
 */
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

/**
 * Wrapping GraphQL client around root '<App>' component
 * @type {Object}
 */
ReactDOM.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>, 
  document.getElementById('root')
);
registerServiceWorker();
