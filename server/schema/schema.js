const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
// Describe your data
const {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
GraphQLList} = graphql;
/* 1.Define Type, 2. Relationship with Data, 3.Define RootQuery*/

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
             //  return _.filter(books,{authorId : parent.id});
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

            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args) {

            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){

            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){

            }
        }
    }
});

//mutations
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent, args){
                //create object
               // console.log(args.name);
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                console.log(typeof(author));
                //insert
               // console.log(author.toString());
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                     name:args.name,
                     genre:args.genre,
                     authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});