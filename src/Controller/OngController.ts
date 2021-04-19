import express from 'express';
import { Request,Response } from 'express';
import { PostOng,PutOrg } from '../Services/OngService';
const router = express.Router();

router.post('/ong', async (req: Request, res: Response) => {
    const response = await PostOng(req.body);

    res.status(response.statusCode).send({
        data: response.data
    })
});

router.put('/ong', async(req : Request, res: Response) => {
    const response = await PutOrg(req.body);

    res.status(response.statusCode).send({
        data: response.data
    })
});


module.exports = router;