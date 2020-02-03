const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require("mongoose");
const app = express();

//Db
mongoose.connect('mongodb://gq-user:Test1234@ds215219.mlab.com:15219/gql-example',{ useNewUrlParser: true });
mongoose.connection.once('open',() => {
  console.log('connected to DB');
});

//middleware
app.use('/graphql',graphqlHTTP ({
//  schema:schema
  schema,
  graphiql:true
    }
    
));

app.listen(4000, () => {
  console.log("Listening Req 4000");
});
