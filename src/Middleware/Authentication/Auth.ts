const secret = 'AdotaPet';
const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

export function GenerateToken(ID: number, Email: string){
    
    const token = jwt.sign({ ID,Email}, secret, {
        expiresIn: 900 // expires in 15min
    });

    return token;
}


export function ValidateToken(req: Request, res: Response){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token fornecido!'});
    
    jwt.verify(token, secret, function(err: any) {
      if (err) 
        return res.status(500).json({ auth: false, message: 'Erro ao autenticar o token! Favor logar novamente na aplicação!' });
    });
}