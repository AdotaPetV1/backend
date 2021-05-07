import express  from 'express';
import { Request,Response } from 'express';
import { DoLogin,ForgotPassword, UpdatePassword } from "../Services/AuthService";

const router = express.Router();

router.get('/auth/login', async(req: Request,res: Response) =>{
    
    const response = await DoLogin(req.body);
    
    res.status(response.statusCode).send({
        data: response.data
    });

});

router.get('/user/forgotPassword', async(req : Request, res: Response) =>{
    const { email }  =  req.body;

    const response = await ForgotPassword(email);
    res.status(response.statusCode).send({
        data: response.data
    });

});

router.get('/user/UpdatePassword', async(req: Request, res: Response) => {
    const { email, senha, token } = req.body;

    const response = await UpdatePassword(email,senha,token);

    res.status(response.statusCode).send({
        data: response.data
    });

});

module.exports = router;