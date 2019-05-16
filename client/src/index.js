import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: process.env.REACT_APP_HTTP_URI,
    request: async operation => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJiaXJvdG9idXNiZW5kZW4tYXBwQHByb2QiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTU4MDA2MTEyLCJleHAiOjE1NTg2MTA5MTJ9.RDvF4X3fw4Tdgh3k5xNHeIgi0g7YJKXmKSExCwmsQBE"
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
