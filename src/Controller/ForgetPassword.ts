const nodemailer = require('nodemailer');

const SMTP_CONFIG = require('../Middleware/Configuration/smtp');

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