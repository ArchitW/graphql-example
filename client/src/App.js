import React from 'react';
import ApolloClient from 'apollo-boost';
import BookList from './components/BookList';
import AuthorList from "./components/AuthorList";
import {ApolloProvider} from '@apollo/react-hooks'

//Apollo Client Setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="main">
                <h1>Reading List</h1>
                <BookList/>
                <AuthorList/>
            </div>
        </ApolloProvider>
    );
}

export default App;
