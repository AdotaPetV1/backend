import express from 'express';
import { Request, Response } from 'express';
import { ValidateToken } from '../Middleware/Authentication/Auth';
import { PostUser, UpdateUser,DeleteUser } from '../Services/UserService';
const router = express.Router();

router.post('/user/register', async (req: Request, res: Response) => {

    
    /*
    #swagger.tags = ['User']
    // #swagger.description = 'Rota para Usuário.'
    // #swagger.summary = 'Realizar o cadastro do usuário.'

    #swagger.responses[200] = {
        description: 'Usuário cadastrado com Sucesso!'
    }
    

    #swagger.responses[400] = {
        description: 'Ocorreu um erro ao cadastrar o usuário!'
    }
    
   
    */

    const response = await PostUser(req.body);

    res.status(response.statusCode).send({
        data: response.data
    })
});

router.put('/user', ValidateToken , async (req: Request, res: Response) => {

    /*
    #swagger.tags = ['User']
    // #swagger.description = 'Rota para Usuário.'
    // #swagger.summary = 'Realiza o upadate dos dados de um usuário.'

    #swagger.responses[200] = {
        description: 'Usuário atualizado com sucesso!'
    }
    

    #swagger.responses[400] = {
        description: 'Ocorreu um erro ao atualizar o Usuário!'
    }
    
   
    */

    const response = await UpdateUser(req.body);

    res.status(response.statusCode).send({
        data: response.data,
        message: response.message
    });

});

router.delete('/user/:ID', ValidateToken , async(req: Request, res: Response) => {

    /*
    #swagger.tags = ['User']
    // #swagger.description = 'Rota para Usuário.'
    // #swagger.summary = 'Deleta o usuário cujo id foi informado.'

    #swagger.responses[200] = {
        description: 'Usuário excluído com sucesso!'
    }
    

    #swagger.responses[500] = {
        description: 'Ocorreu um erro ao tentar deletar o usuário!'
    }
    
    #swagger.parameters['id'] = {
          type: 'Integer',
          description: 'Id do usuário'
      }
   
    */
    
    const { ID } = req.params;

    const response = await DeleteUser(Number(ID));

    res.status(response.statusCode).send({
        data: response.data
    });

});

module.exports = router;