
import { Login as LoginOng, FindOngByEmail,Update as UpdateOng} from "../Data/Repository/OngRepository";
import { Login as LoginUser,FindUserByEmail,Update as UpdateUser } from "../Data/Repository/UserRepository";
import LoginDTO from "../Domain/DTO/Auth/LoginDTO";
import { GenerateToken } from "../Middleware/Authentication/Auth";
import { CloseConnection, OpenConnection } from "../Data/Database/UtilsDataBase";
import { SendEmail } from "../Services/EmailService";
import  EmailEnviar from "../Domain/DTO/Auth/EmailEnviarDTO";
import { GerarTokenAleatorio,IsStringNullOrEmpty } from "../Middleware/Utils/Validators";
import UserModel from "../Domain/Model/UserModel";
import OngModel from "../Domain/Model/OngModel";

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

        let user = new UserModel();
        let ong = new OngModel();

        user = await FindUserByEmail(userEmail);
        ong =  await FindOngByEmail(userEmail);

        if(user != null){

            const token = await GerarTokenAleatorio(6);
            user.TokenRecuperacao = token;
            
            await UpdateUser(user);

            const response = await EnviarToken(user.Email,user.Nome,user.TokenRecuperacao);

            return response;

        }
        else if(ong != null){

            const token = await GerarTokenAleatorio(6);
            ong.TokenRecuperacao = token;
            
            await UpdateOng(ong);

            const response = await EnviarToken(ong.Email,ong.Nome,ong.TokenRecuperacao);
            
            return response;

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

}

export async function UpdatePassword(userEmail: string, novaSenha: string, token: string) {
   
    try{
        
        if(IsStringNullOrEmpty(novaSenha)){
            return { statusCode: 204, data : { message: "O campo senha não pode ser nulo!" }};
        }

        if(IsStringNullOrEmpty(token)){
            return { statusCode: 204, data : { message: "O campo token não pode ser nulo!" }};
        }

        if(IsStringNullOrEmpty(userEmail)){
            return { statusCode: 204, data : { message: "O campo userEmail não pode ser nulo!" }};
        }
        
        OpenConnection();

        let user = new UserModel();
        let ong = new OngModel();

        user = await FindUserByEmail(userEmail);
        ong = await FindOngByEmail(userEmail);

        if(user != null){
            if(token == user.TokenRecuperacao){

                user.Senha = novaSenha;
                user.TokenRecuperacao = "";
                await UpdateUser(user);
    
                return {
                    statusCode: 200,
                    data : {
                        message: "Senha Alterada com sucesso!"
                    }
                }
    
            }
            else{
                return {
                    statusCode: 400,
                    data : {
                        message: "Erro ao solicitar a alteração de senha! Token inválido!"
                    }
                }
            }
        }
        else if(ong != null){
            if(token == ong.TokenRecuperacao){

                ong.Senha = novaSenha;
                ong.TokenRecuperacao = "";
                await UpdateOng(ong);
    
                return {
                    statusCode: 200,
                    data : {
                        message: "Senha Alterada com sucesso!"
                    }
                }
    
            }
            else{
                return {
                    statusCode: 400,
                    data : {
                        message: "Erro ao solicitar a alteração de senha! Token inválido!"
                    }
                }
            }
        }
        else{
            return {
                statusCode: 400,
                data : {
                    message: "Erro ao solicitar a alteração de senha! Token inválido!"
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
}

function EmailMessage(nome : string, token: string){
        
    const message = `Olá, <b>${nome} </b>! <br/>` +
    'Recebemos uma solicitação de alteração de senha! Para a conta cadastrada nesse email. <br/><br/>' +
    `Para avançar no processo de alteração de senha, por favor utilize o seguinte token: <b>${token}</b>`+
    '<br/><br/>'+
    'Atenciosamente, Equipe Adota Pet!';
    
    return message;
}

async function EnviarToken(userEmail: string, nome: string, token: string){
    let email = new EmailEnviar();
    
    email.to = userEmail;
    email.subject = '--------- Recuperar senha ---------';
    email.html = EmailMessage(nome, token);

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