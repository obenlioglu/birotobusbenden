import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: process.env.REACT_APP_HTTP_URI,
    request: async operation => {
        const token = await localStorage.getItem('token');
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
