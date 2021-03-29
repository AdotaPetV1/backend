import express from 'express';
const multer = require('multer');
const parser = multer({ dest: 'public/uploads/' })
const router = express.Router();
import { GetAll, UploadAnimalFile } from '../Services/AnimalService';

router.get('/Animal', async(req,res)=>{
    const { UF }  = req.body;
    const result = await GetAll(UF);
    
    res.status(result.statusCode).send({
        data: result.data,
        message : result.message
    });
});

router.get('/Animal/{id}', async(req,res) =>{

});

router.post('/Animal', async(req,res)=>{

});

router.put('/Animal', async(req,res) =>{

});

router.delete('/Animal', async(req,res)=>{

});

module.exports = router;





