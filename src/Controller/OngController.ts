import express from 'express';
import { Request,Response } from 'express';
import { ValidateToken } from '../Middleware/Authentication/Auth';
import { Delete, GetAll, GetById, PostOng,PutOrg } from '../Services/OngService';
const router = express.Router();

router.post('/ong', async (req: Request, res: Response) => {

    /*
    #swagger.tags = ['Ong']
    // #swagger.description = 'Rota que realiza o cadastro de uma Ong.' 
        #swagger.summary = 'Realiza o cadastro de uma Ong.'

        #swagger.responses[200] = {
        description: 'Ong Cadastrada com Sucesso!'
    }
    

    #swagger.responses[400] = {
        description: 'Erro ao cadastrar a Ong!'
    }
    
   
    */

    const response = await PostOng(req.body);

    res.status(response.statusCode).send({
        data: response.data
    })
});

router.put('/ong', ValidateToken, async(req : Request, res: Response) => {

    /*
    #swagger.tags = ['Ong']
    // #swagger.description = 'Rota que atualiza os dados de uma Ong.'
    #swagger.summary = 'Atualiza os dados de uma Ong.'
    

    #swagger.responses[200] = {
        description: 'Ong atualizada com Sucesso!'
    }
    

    #swagger.responses[400] = {
        description: 'Erro ao atualizar a Ong!'
    }
    
   
    */

    const response = await PutOrg(req.body);

    res.status(response.statusCode).send({
        data: response.data
    });
});

router.get('/ong', async(req: Request, res: Response) =>{

    /*
    #swagger.tags = ['Ong']
    // #swagger.description = 'Rota que mostra todas as Ongs cadastradas.'
        #swagger.summary = 'Exibi todas as Ongs cadastradas.'
        

    #swagger.responses[200] = {
        description: 'Get Successfully'
    }
    

    #swagger.responses[500] = {
        description: 'Ocorreu um erro ao tentar buscar as ongs!'
    }
    
   
    */


    const response = await GetAll();
    
    res.status(response.statusCode).send({
        data: response.data
    });
});

router.get('/ong/:ID', async(req: Request, res: Response) =>{

    /*
    #swagger.tags = ['Ong']
    // #swagger.description = 'Rota que retorna uma Ong pelo Id informado.'
       #swagger.summary = 'Exibi a Ong cujo Id foi informado.'
       

    #swagger.responses[200] = {
        description: 'Get Successfully'
    }
    

    #swagger.responses[500] = {
        description: 'Ocorreu um erro ao tentar buscar a ong pelo ID!'
    }

    #swagger.parameters['id'] = {
          type: 'Integer',
          description: 'Id da Ong'
      }
    
   
    */
    
    const { ID } = req.params;

    const response = await GetById(Number(ID));

    res.status(response.statusCode).send({
        data: response.data
    });
});

router.delete('/ong/:ID', ValidateToken, async(req: Request, res: Response) =>{

    /*
    #swagger.tags = ['Ong']
    // #swagger.description = 'Rota que deleta a Ong cujo o ID foi informado.'
    // #swagger.summary = 'Deleta a Ong cujo o ID foi informado.'
    

    #swagger.responses[200] = {
        description: 'ONG excluída com sucesso!'
    }
    

    #swagger.responses[500] = {
        description: 'Ocorreu um erro ao tentar deletar a ONG!'
    }

    #swagger.parameters['id'] = {
          type: 'Integer',
          description: 'Id da Ong'
      }
    
   
    */

    const { ID } = req.params;

    const response = await Delete(Number(ID));

    res.status(response.statusCode).send({
        data: response.data
    });
});

module.exports = router;