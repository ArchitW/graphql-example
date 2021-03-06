const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
//allow cross origin requests
app.use(cors());
//Db
mongoose.connect('mongodb://gq-user:Test1234@ds215219.mlab.com:15219/gql-example', {useNewUrlParser: true, useUnifiedTopology:true});
mongoose.connection.once('open', () => {
    console.log('connected to DB');
});

//middleware
app.use('/graphql', graphqlHTTP({
//  schema:schema
        schema, // defining our graph
        graphiql: true
    }
));

app.listen(4000, () => {
    console.log("Listening Req 4000");
});
