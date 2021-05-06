import { extname } from "node:path";

const nodemailer = require('nodemailer');

const { host, port, user, pass } = require('../Config/smtp');

const hbs = require('nodemailer-express-handlebars');

const path = require('path');

const transport = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },

});

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail'),
    extname: '.html'
}))

/*async function run() {
    const mailSent = await transport.sendMail({
        text: 'texto do email',
        subject: 'Assunto do email',
        from: 'Adota Pet <adotapet45@gmail.com>',
        to: 'adotapet45@gmail.com'
    });

    console.log(mailSent);

    transport.use('compile', hbs({
        viewEngine: 'handlebars',
        viewPath: path.resolve('./src/Resources/mail/'),
        extName: '.html',
    }))
}
*/
