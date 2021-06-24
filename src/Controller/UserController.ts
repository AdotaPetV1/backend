import express from 'express';
import { Request, Response } from 'express';
import { PostUser, UpdateUser,DeleteUser } from '../Services/UserService';
const router = express.Router();

router.post('/user/register', async (req: Request, res: Response) => {
    const response = await PostUser(req.body);

    res.status(response.statusCode).send({
        data: response.data
    })
});

router.put('/user', async (req: Request, res: Response) => {

    const response = await UpdateUser(req.body);

    res.status(response.statusCode).send({
        data: response.data,
        message: response.message
    });

});

router.delete('/user/:ID', async(req: Request, res: Response) => {
    
    const { ID } = req.params;

    const response = await DeleteUser(Number(ID));

    res.status(response.statusCode).send({
        data: response.data
    });

});

module.exports = router;