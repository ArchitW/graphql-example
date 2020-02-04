import React, {Component} from 'react';
import {gql} from 'apollo-boost';

const getBooksQuery = gql`
    {
        books {
            name
            id
        }
    }
`;

class BookList extends Component {
    render() {
        return (
            <div>
                <ul id="book-list">
                    <li>Reading List</li>
                </ul>
            </div>
        );
    }
}

export default BookList;

/* Steps:
1 construct query
2 take query and bind with component
 */