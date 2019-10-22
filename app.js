require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/db');
const PORT = 7000;
const router = require('./router');
const bodyparser = require('body-parser');
const FarmController = require('./Controllers/farm');

app.use(bodyparser.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/api_farms', router);

app.get('/', (req, res) => {
  res.status(200);
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found!');
});

app.listen(PORT, () => {
  console.log('Listening on PORT 7000....');
});
