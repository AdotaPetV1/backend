import express from 'express';
import { Request, Response } from 'express';
import { PostUser, UpdateUser } from '../Services/UserService';
const router = express.Router();

router.post('/user/register', async (req: Request, res: Response) => {
    const response = await PostUser(req.body);

    res.status(response.statusCode).send({
        data: response.data
    })
});


router.put('/User', async (req: Request, res: Response) => {

    const response = await UpdateUser(req.body);

    res.status(response.statusCode).send({
        data: response.data,
        message: response.message
    });

});

module.exports = router;