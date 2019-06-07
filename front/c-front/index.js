require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 1234;
console.log('process.emv', process.env);

express()
  .use(express.static(`${__dirname}/dist`))
  .get('*', (req, res) => res.sendFile(`${__dirname}/dist/index.html`))
  .listen(PORT, () => console.log('__CLIENT_RUNNING__', PORT));
