import express from 'express';
import { GetAll } from '../Services/AnimalService';
const router = express.Router();

router.get('/getAll', async(req,res)=>{
    const { UF }  = req.body;
    const result = await GetAll(UF);
    
    res.status(result.statusCode).send({
        data: result.data,
        message : result.message
    });

});

//router.post('/Animal', AnimalRepository.create)


module.exports = router;





