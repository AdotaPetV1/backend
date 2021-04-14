
import { Login as LoginOng} from "../Data/Repository/OngRepository";
import { Login as LoginUser} from "../Data/Repository/UserRepository";
import LoginDTO from "../Domain/DTO/Auth/LoginDTO";

export async function DoLogin(user: LoginDTO){

    try{

        //Procura o e-mail na base de usuário primeiro
        const result = await LoginUser(user);

        if(result.length > 0){
            return {
                statusCode: 200,
                data: {
                    userType: "User",
                    message: "Usuário autenticado com sucesso!",
                    user: result[0]
                }
            }
        }
        else{
            //Caso não encontre o e-mail do usuário pesquisa na ong
            //Foi feito desse jeito para termos uma única rota de login, ao invés de duas
            const result = await LoginOng(user);
            if(result.length > 0){
                return {
                    statusCode: 200,
                    data: {
                        userType: "Ong",
                        message: "ONG autenticada com sucesso!",
                        user: result[0]
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
}