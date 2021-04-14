import express  from 'express';
import { Request,Response } from 'express';
import { DoLogin } from '../Services/AuthService';
const router = express.Router();

router.get('/auth/login', async(req: Request,res: Response) =>{
    const response = await DoLogin(req.body);
    res.status(response.statusCode).send({
        data: response.data
    })
});

module.exports = router;