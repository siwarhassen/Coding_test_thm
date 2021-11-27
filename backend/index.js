const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const morganMiddleware = require('./middelware/logger');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const port = 3002;
// create express app
const app = express();
var userRouter = require('./routes/user');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(morganMiddleware);
app.get('/health', (req, res) => res.send({ message: 'ok' }));

// call userRouter 
app.use('/user', userRouter);
const server = app.listen(port, () => {
  console.log(`THM App running on port ${port}.`);
});
module.exports = server;
