const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

//middleware

app.use('/graphql',graphqlHTTP (
    
));

app.listen(4000, () => {
  console.log("Listening Req 4000");
});
