const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');

// Initialize singleton for mssql driver
require('./database/mssql');

const router = require('./routes/router');

const app = express();

// allows cross-origin HTTP requests => https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));

// allows access to req object => https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

module.exports = app;
