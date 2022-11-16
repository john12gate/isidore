import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'http://localhost:5000/graphql/' });
const client = new ApolloClient({ cache, link });
/*
  Connect Apollo Client to React app by wrapping root App component with
  ApolloProvider component and passing client instance via client prop.
  ApolloProvider component is similar to React’s Context provider. 
  It wraps React app and places client in the context, 
  which enables you to access it from anywhere in the app.
*/
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
