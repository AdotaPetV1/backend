import express from 'express';
import {Request,Response} from 'express';
const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })
const router = express.Router();
import { GetAll, PostAnimal,GetAnimalByID,DeleteAnimal,UpdateAnimal } from '../Services/AnimalService';
import AnimalRegisterDTO from '../Domain/DTO/Animal/AnimalRegisterDTO';

router.get('/animal', async(req : Request ,res : Response)=>{
    const { UF }  = req.body;
    const result = await GetAll(UF);
    
    res.status(result.statusCode).send({
        data: result.data,
        message : result.message
    });
});

router.get('/animal/:ID', async(req : Request ,res : Response) =>{

    const { ID } = req.params;

    const result = await GetAnimalByID(Number(ID));

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });

});

router.post('/animal', async(req : Request ,res : Response)=>{

    const result = await PostAnimal(req.body);

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });

});

router.put('/animal', async(req : Request ,res : Response) =>{

    const result = await UpdateAnimal(req.body);

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });

});

router.delete('/animal/:ID', async(req : Request ,res : Response)=>{

    const { ID } = req.params;

    const result = await DeleteAnimal(Number(ID));

    res.status(result.statusCode).send({
        message: result.message
    });

});

module.exports = router;





