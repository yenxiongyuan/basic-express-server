'use strict';

const express = require('express');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const validator = require('./middleware/validator');
const logger = require("./middleware/logger");
require('dotenv').config();


const PORT = process.env.PORT || 3002;

const app = express();

app.use(logger);

app.get('/', (req, res) => {

  const message = `hello, how are you?`;

  res.status(200).send(message);
});

app.get('/person', validator, (req, res) => {
  // if no person name go 500.js
  
  // if (!req.query.personName) {
  //   next();
  //   return;
  // }

  const message = `${req.query.personName}, what do you like to eat?`;
  const output = { message };

  res.status(200).json(output);
});

function start() {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

app.use('*', notFound);
app.use(errorHandler);

module.exports = { start, app };
