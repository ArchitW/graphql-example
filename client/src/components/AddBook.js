import React ,{Component} from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";

const getAuthors=gql`
    {
        authors{
            name
            id
        }
    }
`
const AddBook = () =>{
    const {loading, error, data } = useQuery(getAuthors);
    if(loading) return <p>Loading</p>
    if(error) return <p>Error</p>
    const {authors} = data;
    const AuthorsList = authors.map((author) => {
        return <option value={author.id} key={author.id}>{author.name}</option>
    });

    return(
        <form action="">
            <div className="field">
                <label htmlFor="">Book Name</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label htmlFor="">Gener</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label htmlFor="">Author</label>
                <select>
                    <option value="">Select Value</option>
                    {AuthorsList}
                </select>
            </div>
            <button>+</button>
        </form>
    )

};
export default AddBook;