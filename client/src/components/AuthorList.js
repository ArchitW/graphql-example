import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
const getAuthors=gql`
    {
        authors{
            name
            age
        }
    }
`

const  AuthorList = () => {
    const {loading, error, data} = useQuery(getAuthors);
if(loading) return <p>Loading</p>
if(error) return <p>Error</p>
console.log(data);
const {authors} = data;
    console.log(authors);

        return (
            <div>

            </div>
        );

};

export default AuthorList;