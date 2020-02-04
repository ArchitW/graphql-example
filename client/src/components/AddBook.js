import React ,{Component, useState} from 'react';
import {useQuery, useMutation} from "@apollo/react-hooks";
import {addBookMutation, getAuthorsQuery, getBooksQuery} from "../queries/queries";


const AddBook = () =>{
    //Mutation hook
    const [insertBook] = useMutation(addBookMutation);
//https://dev.to/zeyadetman/from-reactjs-class-component-to-functional-component---usestate-part-1-2l3m
// https://codesandbox.io/s/kkm2o57ky3
//state variables.
    const [name,setName ] = useState('');
    const [genre,setGenre ] = useState('');
    const [authorId,setAuthorId ] = useState('');
// GraphQL query //
    const {loading, error, data } = useQuery(getAuthorsQuery);
    if(loading) return <p>Loading</p>
    if(error) return <p>Error</p>
    const {authors} = data;
    const AuthorsList = authors.map((author) => {
        return <option value={author.id} key={author.id}>{author.name}</option>
    });

    //submits form
    //https://rangle.io/blog/simplifying-controlled-inputs-with-hooks/
    const handleSubmitForm = (e) =>{
        e.preventDefault();
        console.log(name , genre, authorId);
        //addTodo({ variables: { type: input.value } });
       insertBook({variables:{
               name: name,
               authorId:authorId ,
               genre:genre
       },
           refetchQueries:[{query:getBooksQuery}]
       });
       // <Mutation mutation={ADD_USER} variables={{ username }} onError={() => {}}>
    };
    return(
        <form onSubmit={handleSubmitForm}>
            <div className="field">
                <label htmlFor="">Book Name</label>
                <input type="text"
                       placeholder={name}
                       onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="">Gener</label>
                <input type="text"
                placeholder={genre}
                onChange={(e)=>setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="">Author</label>
                <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}>

                    {AuthorsList}
                </select>
            </div>
            <button>+</button>
        </form>
    )

};
export default AddBook;