import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: process.env.REACT_APP_HTTP_URI,
    request: async operation => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTc4Mzk3MzAsIm5iZiI6MTU1NzgzOTczMCwiZXhwIjoxNTU3OTI2MTMwfQ.yrqbabc6cmN4cF6ZIxAva6hHUMh8B9wzKO10q6LW3ZM"
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        });
       }
});

ReactDOM.render(
<ApolloProvider client={client}>
    <App />
</ApolloProvider>, 
document.getElementById('root'));
