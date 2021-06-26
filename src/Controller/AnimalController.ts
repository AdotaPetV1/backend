import express from 'express';
import {Request,Response} from 'express';
const router = express.Router();
import { GetAll, PostAnimal,GetAnimalByID,DeleteAnimal,UpdateAnimal } from '../Services/AnimalService';
import { ValidateToken } from '../Middleware/Authentication/Auth';
const multer = require('../Middleware/Utils/FileUpload');

router.get('/animal', async(req : Request ,res : Response)=>{

/* #swagger.tags = ['Animal']
    #swagger.description = 'Retorna todos os animais'
    #swagger.summary = 'Exibi todos os animais cadastrados'

    #swagger.responses[500] = {
        description: 'Ocorreu um erro ao buscar os animais!'
    }
    
    #swagger.parameters['UF'] = {
          type: 'String'
          
      }

    */

    const { UF }  = req.body;
    const result = await GetAll(UF);
    
    res.status(result.statusCode).send({
        data: result.data,
        message : result.message
    });
});

router.get('/animal/:ID',  async(req : Request ,res : Response) =>{

    /*
    #swagger.tags = ['Animal']
    // #swagger.description = 'Retorna o animal cujo id foi informado.'
    // #swagger.summary = 'Exibi o animal cujo id foi informado.'

    #swagger.responses[200] = {
        description: 'Get Successfully '
    }
    

    #swagger.responses[500] = {
        description: 'Favor passar um ID válido!!'
    }
    
    
    #swagger.parameters['id'] = {
          type: 'Integer',
          description: 'Id do animal'
      }

    */

    const { ID } = req.params;

    const result = await GetAnimalByID(Number(ID));

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });
    
});

router.post('/animal',ValidateToken, async(req : Request ,res : Response)=>{

    /*
    #swagger.tags = ['Animal']
    // #swagger.description = 'Rota que cadastra os animais.
    
    // #swagger.summary = 'Cadastra os animais.'

    #swagger.responses[200] = {
        description: 'Post Successfully '
    }
    
    
    #swagger.responses[400] = {
        description: 'Ocorreu um erro ao cadastrar os animais!!'
    }
    
    

    */

    const result = await PostAnimal(req.body);

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });
});

router.put('/animal', ValidateToken, async(req : Request ,res : Response) =>{

    /*
    #swagger.tags = ['Animal']
    // #swagger.description = 'Rota que atualiza os dados dos animais.'
    // #swagger.summary = 'Atualiza os dados dos animais.'

    #swagger.responses[200] = {
        description: 'Animal atualizado com sucesso!'
    }
    

    #swagger.responses[400] = {
        description: 'Ocorreu um erro ao atualizar o animal!'
    }
    
   
    */

    const result = await UpdateAnimal(req.body);

    res.status(result.statusCode).send({
        data: result.data,
        message: result.message
    });
});

router.delete('/animal/:ID', ValidateToken, async(req : Request ,res : Response)=>{

    /*
    #swagger.tags = ['Animal']
    // #swagger.description = 'Rota que deleta o animal cujo o ID foi informado.'
    // #swagger.summary = 'Deleta o animal cujo o ID foi informado.'
    

    #swagger.responses[200] = {
        description: 'Animal excluído com sucesso!'
    }
    
    #swagger.responses[400] = {
        description: 'Favor passar um ID válido!'
    }

    #swagger.responses[500] = {
        description: 'Ocorreu um erro ao deletar o animal!'
    }
   
    */

    const { ID } = req.params;

    const result = await DeleteAnimal(Number(ID));

    res.status(result.statusCode).send({
        message: result.message
    });
});

router.post('/animal/upload', ValidateToken, multer.single('image'), async(req: any, res: Response)=>{

    /*
    #swagger.tags = ['Animal']
    // #swagger.description = 'Rota que possibilita o upload de imagens dos animais.'
    // #swagger.summary = 'Envio de imagens dos animais.'

    #swagger.responses[200] = {
        description: 'Arquivo enviado com sucesso!'
    }
   

    #swagger.responses[400] = {
        description: 'Houve erro no upload!'
    }

    #swagger.parameters['file'] = {
          type: 'String',
          description: 'Arquivo que o usuário deseja enviar.'
      }
   
    */

    console.log("OI")
    console.log(req.file)
    console.log(req.form)
    
    // Se houve sucesso no armazenamento
    if (req.file) {
        // Vamos imprimir na tela o objeto com os dados do arquivo armazenado
        return res.send(req.file);
    }

    // Se o objeto req.file for undefined, ou seja, não houve sucesso, vamos imprimir um erro!
    return res.send('Houve erro no upload!');

})
module.exports = router;





