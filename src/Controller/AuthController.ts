import express  from 'express';
import { Request,Response } from 'express';
import { DoLogin,ForgotPassword, UpdatePassword } from "../Services/AuthService";

const router = express.Router();

router.post('/auth/login', async(req: Request,res: Response) =>{

     /*
    #swagger.tags = ['Autenticação']
    // #swagger.description = 'Rota para autenticação do usuário.'
    // #swagger.summary = 'Autenticação do usuário.'

    #swagger.responses[200] = {
        description: 'Usuário autenticado com sucesso!'
    }
    
  
   
    */
    
    const response = await DoLogin(req.body);
    
    res.status(response.statusCode).send({
        data: response.data
    });

});

router.post('/auth/forgotPassword', async(req : Request, res: Response) =>{

    /*
    #swagger.tags = ['Autenticação']
    // #swagger.description = 'Rota para recuperar a senha do usuário.'
    // #swagger.summary = 'Recuperação da senha do usuário.'

    #swagger.responses[500] = {
        description: 'Ocorreu um erro ao solicitar a alteração de senha!'
    }
    
   */

    const { Email }  =  req.body;

    const response = await ForgotPassword(Email);
    res.status(response.statusCode).send({
        data: response.data
    });

});

router.post('/auth/UpdatePassword', async(req: Request, res: Response) => {

    /*
    #swagger.tags = ['Autenticação']
    // #swagger.description = 'Rota para atualizar a senha do usuário.'
    // #swagger.summary = 'Atualiza a senha do usuário.'

    #swagger.responses[200] = {
        description: 'Senha Alterada com sucesso!'
    }
    

    #swagger.responses[500] = {
        description: 'Erro ao solicitar a alteração de senha! Token inválido!'
    }
    
   */


    const { email, senha, token } = req.body;

    const response = await UpdatePassword(email,senha,token);

    res.status(response.statusCode).send({
        data: response.data
    });

});

module.exports = router;