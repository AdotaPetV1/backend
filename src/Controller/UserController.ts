import express from 'express';
import { PostUser, DoLogin } from '../Services/UserService';
const router = express.Router();

router.post('/register', async(req, res) =>{
    const response = await PostUser(req.body);
    
    res.status(response.statusCode).send({
        data: response.data
    })
});

router.get('/login', async(req,res) =>{
    const response = await DoLogin(req.body);
    res.status(response.statusCode).send({
        data: response.data
    })
});

module.exports = router;