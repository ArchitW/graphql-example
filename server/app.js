const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const app = express();

//middleware

app.use('/graphql',graphqlHTTP ({
//  schema:schema
  schema
    }
    
));

app.listen(4000, () => {
  console.log("Listening Req 4000");
});
