import express from 'express';
import { Request, Response } from 'express';
import { DoLogin } from '../Services/AuthService';

const { host, port, user, pass } = require('../../Config/smtp');

const crypto = require('crypto')

import { ForgotPassword } from "../Services/AuthService";


const router = express.Router();

router.get('/auth/login', async (req: Request, res: Response) => {
    const response = await DoLogin(req.body);
    res.status(response.statusCode).send({
        data: response.data
    })
});


router.post('/forgot_password', async (req: Request, res: Response) => {
    const { email } = req.body

    try {
        const User = await user.findOne({ email })

        if (!user)
            return res.status(400).send({ error: 'User not found' })

        const token = crypto.radomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)



    } catch (err) {
        res.status(400).send({ error: 'Erro on forgot password, try again' })
    }
})


router.get('/user/forgotPassword', async (req: Request, res: Response) => {
    const { email } = req.body;

    const response = await ForgotPassword(email);
    res.status(response.statusCode).send({
        data: response.data
    })
});

module.exports = router;