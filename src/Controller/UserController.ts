    import express from 'express';
    import { validation } from '../Middleware/Authentication/Auth';
    import { PostUser } from '../Services/UserService';

    const router = express.Router();

    //router.use(validation);
    
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

    module.exports = router;