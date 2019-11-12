const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const wagner = require('wagner-core');
const swaggerUi = require('swagger-ui-express');
const expressValidator = require('express-validator');
const config = require('config');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(
    config.db.url,
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true},
).then(
    () => { },
).catch(
    (err) => console.log('error', err),
);

wagner.factory('mongoose', () => mongoose);

require('./utils/middleware')(wagner);
require('./controllers')(wagner);
require('./managers')(wagner);
require('./models')(wagner);
require('./routes')(app, wagner);

module.exports = app;
