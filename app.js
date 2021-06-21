const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
var cors = require('cors');

const coderProjectSchema = require('./schema/coderProjectSchema');
const dbURI = require('./config/config');

const app = express();
app.use(cors());

// bind express with graphql
app.use('/api', graphqlHTTP(
  {
    schema: coderProjectSchema,
    graphiql: true
  })
);

mongoose.connect(dbURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify: false
  })
    .then((_res) =>
    {
      const port = 5000;
      app.listen(port, () => console.log(`Server listening on port ${port}`));
    })
      .catch((err) => console.log(err));