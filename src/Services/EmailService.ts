import nodemailer from 'nodemailer';
import EmailEnviar from '../Domain/DTO/Auth/EmailEnviarDTO';

//Criando serviço que enviar
const remetente = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:  'adotapet15@gmail.com',
        pass:  'AdotaPet@123' 
    }
});

export async function SendEmail(Email: EmailEnviar){
    try{
        await remetente.sendMail(Email);
        return {
            valid: true,
            message : "E-mail enviado com sucesso!" 
        }
    }
    catch(err){
        return {
            valid: false,
            message: err
        }
    }

}