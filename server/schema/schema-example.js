const graphql = require('graphql');
const _ = require('lodash');
// Describe your data
const {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
GraphQLList} = graphql;
/* 1.Define Type, 2. Relationship with Data, 3.Define RootQuery*/
//dummy data
let books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId:'1'},
    {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId:'2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId:'3'},
    {name: 'The Long Earth II', genre: 'Sci-Fi', id: '4', authorId:'3'},
    {name: 'The Long Earth III', genre: 'Sci-Fi', id: '5', authorId:'3'},
];
let authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];
// Define Type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        //define what type of field is
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent, args){
                console.log(parent);
                //return parent.authorId
                return _.find(authors,{id:parent.authorId});
            }
        }
    })
});

const AuthorType =  new GraphQLObjectType({
    name:'Author',
    fields:() => ({
       name:{type:GraphQLString},
       age:{type:GraphQLInt},
       id:{type:GraphQLID},
        books:{
           type:new GraphQLList(BookType),
            resolve(parent, args){
               return _.filter(books,{authorId : parent.id});
            }
        }
    })
});
// Relationship with with Data / Types

// Define RootQuery : how we jump into the graph
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: { // when some one queries a book.
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from DB/ OtherSource
                //args.id
                //console.log(typeof args.id);
                return _.find(books, {id: args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args) {
                return _.find(authors,{id:args.id});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
                return books;
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});