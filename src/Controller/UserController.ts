import express from 'express';
import { PostUser } from '../Services/UserService';
const router = express.Router();

router.post('/register', async(req, res) =>{
    const response = await PostUser(req.body);
    
    if(response.statusCode == 201)
    {
        res.status(201).send({
            IdUsuario: response.IdUsuario,
            message: response.message
        })
    }
    else{
        res.status(response.statusCode).send({
            message: response.message
        })
    }
});

router.get('/login', async(req,res) =>{
    
});
module.exports = router;