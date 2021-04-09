import express from 'express';
import { PostOng, DoLogin } from '../Services/OngService';
const router = express.Router();


router.post('/ong/register', async (req, res) => {
    const response = await PostOng(req.body);

    res.status(response.statusCode).send({
        data: response.data
    })
});

router.get('/ong/login', async (req, res) => {
    const response = await DoLogin(req.body);
    res.status(response.statusCode).send({
        data: response.data
    })
});

module.exports = router;