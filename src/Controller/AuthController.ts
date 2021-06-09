import express  from 'express';
import { Request,Response } from 'express';
import { DoLogin,ForgotPassword, UpdatePassword } from "../Services/AuthService";

const router = express.Router();

router.post('/auth/login', async(req: Request,res: Response) =>{
    
    const response = await DoLogin(req.body);
    
    res.status(response.statusCode).send({
        data: response.data
    });

});

router.post('/auth/forgotPassword', async(req : Request, res: Response) =>{
    const { Email }  =  req.body;

    const response = await ForgotPassword(Email);
    res.status(response.statusCode).send({
        data: response.data
    });

});

router.post('/auth/UpdatePassword', async(req: Request, res: Response) => {
    const { email, senha, token } = req.body;

    const response = await UpdatePassword(email,senha,token);

    res.status(response.statusCode).send({
        data: response.data
    });

});

module.exports = router;