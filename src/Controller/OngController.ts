import express from 'express';
import {Request,Response} from 'express';
import { PostOng } from '../Services/OngService';
const router = express.Router();

router.post('/ong/register', async (req: Request, res: Response) => {
    const response = await PostOng(req.body);

    res.status(response.statusCode).send({
        data: response.data
    })
});


module.exports = router;