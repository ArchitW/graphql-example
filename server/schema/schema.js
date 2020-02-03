const graphql = require('graphql');

// Describe your data
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;
// Define Type
const BookType =  new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        //define what type of field is
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
});

// Relationship with with Data / Types

// Define RootQuery : how we jump into the graph
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{ // when some one queries a book.
            type: BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent, args){
                //code to get data from DB/ OtherSource
                args.id
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});