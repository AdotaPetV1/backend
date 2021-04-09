
import express from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');

const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('./Middleware/Configuration/smtp');
const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

async function run() {
    const mailSent = await transporter.sendMail({
        text: 'texto do email',
        subject: 'Assunto do email',
        from: 'Adota Pet <adotapet45@gmail.com',
        to: 'adotapet45@gmail.com'
    });

    console.log(mailSent);
}

run()


//Documentação
const SwaggerUI = require('swagger-ui-express');
const SwaggerDocument = require('./Middleware/Configuration/SwaggerOptions.json');

const application = express();

const UserController = require('./Controller/UserController');
const AnimalController = require('./Controller/AnimalController');
const OngController = require('./Controller/OngController');

// Enable CORS
application.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
application.use(cors());
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: false }));

//Rota do swagger
application.use('/api/docs', SwaggerUI.serve, SwaggerUI.setup(SwaggerDocument));

// Rotas da aplicação
application.use('/api', UserController);
application.use('/api', AnimalController);
application.use('/api', OngController);

module.exports = application;