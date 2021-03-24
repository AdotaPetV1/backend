
import express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');

//Documentação
const SwaggerUI = require('swagger-ui-express');
const SwaggerDocument = require('./Middleware/Configuration/SwaggerOptions.json');

const application = express();

const UserController = require('./Controller/UserController');

application.use(cors());
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: false}));

//Rota do swagger
application.use('/api/docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDocument));

// Rotas da aplicação
application.use('/api/user',UserController);

module.exports = application;