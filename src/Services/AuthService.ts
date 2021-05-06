
import { Login as LoginOng} from "../Data/Repository/OngRepository";
import { Login as LoginUser,FindUserByEmail} from "../Data/Repository/UserRepository";
import LoginDTO from "../Domain/DTO/Auth/LoginDTO";
import { GenerateToken } from "../Middleware/Authentication/Auth";
import { CloseConnection, OpenConnection } from "../Data/Database/UtilsDataBase";
import  { SendEmail } from "../Services/EmailService";
import  EmailEnviar from "../Domain/DTO/Auth/EmailEnviarDTO";
import { EmitFlags } from "typescript";

export async function DoLogin(user: LoginDTO){

    try{
        OpenConnection();
        //Procura o e-mail na base de usuário primeiro
        const result = await LoginUser(user);
        
        if(result.length > 0){

            const token = GenerateToken(result.IdUsuario,result.Email);

            return {
                statusCode: 200,
                data: {
                    userType: "User",
                    message: "Usuário autenticado com sucesso!",
                    user: result[0],
                    token: token
                }
            }
        }
        else{
            //Caso não encontre o e-mail do usuário pesquisa na ong
            //Foi feito desse jeito para termos uma única rota de login, ao invés de duas
            const result = await LoginOng(user);
            if(result.length > 0){
                const token = GenerateToken(result.IdOrg,result.Email);

                return {
                    statusCode: 200,
                    data: {
                        userType: "Ong",
                        message: "ONG autenticada com sucesso!",
                        user: result[0],
                        token: token
                    }
                }
            }
            else{
                return {
                    statusCode: 400,
                    data : {
                        message: "Erro ao logar! E-mail ou senha inválidos!"
                    }
                }
            }
        }
    }
    catch(err){
        return{
            statusCode: 500,
            data: {
                message: "Ocorreu um erro ao realizar o login!"
            }
        }
    }
    finally{
        CloseConnection();
    }
}

export async function ForgotPassword(userEmail : string) {

    try{

        OpenConnection();

        const user = await FindUserByEmail(userEmail);

        if(user.IdUsuario != null){

            let email = new EmailEnviar();
    
            email.to = user.Email;
            email.subject = '--------- Recuperar senha ---------';
            email.text = EmailMessage(user.Nome, '123456');
        
            const EmailEnviado = await SendEmail(email);

            if(EmailEnviado.valid){
                return{
                    statusCode: 200,
                    data: {
                        message: "E-mail de recuperação de senha enviado para o email: " + userEmail
                    }
                }
            }
            else{
                return{
                    statusCode: 202,
                    data: {
                        message: "Não foi possível enviar o e-mail de recuperação para o email: " + userEmail
                    }
                }
            }

        }
        else{
            return{
                statusCode: 204,
                data: {
                    message: "Não foi encontrado nenhum usuário com esse e-mail!"
                }
            }
        }

    }
    catch(err){
        return{
            statusCode: 500,
            data: {
                message: "Ocorreu um erro ao solicitar a alteração de senha!"
            }
        }
    }
    finally{
        CloseConnection();
    }

    function EmailMessage(nome : string, token: string){
        
        const message = `Olá, <b>${nome} </b>! <br/>` +
        'Recebemos uma solicitação de alteração de senha! Para a conta cadastrada nesse email. <br/>' +
        'Para avançar no processo de alteração de senha, por favor utilize o seguinte token: <br>KJADWE</b>'+
        '<br/><br/>'+
        'Atenciosamente, Equipe Adota Pet!';
        
        return message;
    }
}
