//Isso aqui tinha que tá no .ENV, mas por algum motivo dá um erro na hora de puxar ele.

const secret = 'AdotaPet'; 
const jwt = require('jsonwebtoken');
import { Request, Response,NextFunction } from 'express';

export function GenerateToken(ID: number, Email: string){
    
    const token = jwt.sign({ ID,Email}, secret, {
        expiresIn: 900 // expires in 15min
    });

    return token;
}


export async function ValidateToken(req: Request, res: Response, next : NextFunction){
    const token = req.headers['x-access-token'];
    if (!token) 
         return res.status(401).send({ auth: false, message: 'Nenhum token fornecido!'});
    else{
        jwt.verify(token, secret, function(err: any) {
            if (err) 
              return res.status(500).send({ auth: false, message: 'Erro ao autenticar o token! Favor logar novamente na aplicação!' });
            next();
        });
    }
}