import express from 'express';
import {Request,Response} from 'express';
const router = express.Router();
import { GetAll, PostAnimal,GetAnimalByID,DeleteAnimal,UpdateAnimal } from '../Services/AnimalService';
import { ValidateToken } from '../Middleware/Authentication/Auth';

router.get('/animal', async(req : Request ,res : Response)=>{
    ValidateToken(req,res);
    const { UF }  = req.body;
    const result = await GetAll(UF);
    
    res.status(result.statusCode).send({
        data: result.data,
        message : result.message
    });
});

router.get('/animal/:ID', async(req : Request ,res : Response) =>{
    ValidateToken(req,res);
    const { ID } = req.params;

    const result = await GetAnimalByID(Number(ID));

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });

});

router.post('/animal', async(req : Request ,res : Response)=>{
    ValidateToken(req,res);
    const result = await PostAnimal(req.body);

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });

});

router.put('/animal', async(req : Request ,res : Response) =>{
    ValidateToken(req,res);
    const result = await UpdateAnimal(req.body);

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });

});

router.delete('/animal/:ID', async(req : Request ,res : Response)=>{
    ValidateToken(req,res);
    const { ID } = req.params;

    const result = await DeleteAnimal(Number(ID));

    res.status(result.statusCode).send({
        message: result.message
    });

});

module.exports = router;





