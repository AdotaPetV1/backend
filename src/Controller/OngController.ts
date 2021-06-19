import express from 'express';
import { Request,Response } from 'express';
import { Delete, GetAll, GetById, PostOng,PutOrg } from '../Services/OngService';
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
    });
});

router.get('/ong', async(req: Request, res: Response) =>{
    const response = await GetAll();
    
    res.status(response.statusCode).send({
        data: response.data
    });
});

router.get('/ong/:ID', async(req: Request, res: Response) =>{
    
    const { ID } = req.params;

    const response = await GetById(Number(ID));

    res.status(response.statusCode).send({
        data: response.data
    });
});

router.delete('/ong/:ID', async(req: Request, res: Response) =>{
    const { ID } = req.params;

    const response = await Delete(Number(ID));

    res.status(response.statusCode).send({
        data: response.data
    });
});

module.exports = router;