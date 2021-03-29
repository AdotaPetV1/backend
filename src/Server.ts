
import express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');

//Documentação
const SwaggerUI = require('swagger-ui-express');
const SwaggerDocument = require('./Middleware/Configuration/SwaggerOptions.json');

const application = express();

const UserController = require('./Controller/UserController');
const AnimalController = require('./Controller/AnimalController');

// Enable CORS
application.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
application.use(cors());
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({extended: false}));

//Rota do swagger
application.use('/api/docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDocument));

// Rotas da aplicação
application.use('/api/user',UserController);
application.use('/api/animal', AnimalController);

module.exports = application;