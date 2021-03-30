import express from 'express';
const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })
const router = express.Router();
import { GetAll, PostAnimal } from '../Services/AnimalService';
import { AnimalRegisterDTO } from '../Domain/DTO/AnimalDTO';

router.get('/animal', async(req,res)=>{
    const { UF }  = req.body;
    const result = await GetAll(UF);
    
    res.status(result.statusCode).send({
        data: result.data,
        message : result.message
    });
});

router.get('/animal/{id}', async(req,res) =>{

});

router.post('/animal', async(req,res)=>{
    
    const result = await PostAnimal(req.body);

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });

});

router.put('/animal', async(req,res) =>{

});

router.delete('/Animal', async(req,res)=>{

});

module.exports = router;





