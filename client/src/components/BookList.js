import React, {Component} from 'react';
import {gql} from 'apollo-boost'; // for querying
import {useQuery} from '@apollo/react-hooks'; // Binding
import {getBooksQuery} from "../queries/queries";

const BookList = () => {
    const {loading, error, data} = useQuery(getBooksQuery);
    if (loading) return <p>loading</p>
    if (error) console.log(error);//return <p>Error</p>

    console.log(data);
    const {books} = data;
    const bookListItems = books.map((book) => {
        return <li key={book.id}>{book.name}</li>
    });

    return (
        <div>
            <ul id="book-list">{bookListItems}</ul>
        </div>
    )
};

export default BookList;

/* Steps:
1 construct query
2 take query and bind with component
 */