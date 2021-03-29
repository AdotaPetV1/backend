import  { UserRegisterDTO, UserLoginDTO }  from "../Domain/DTO/UserDTO";
import  { Register,ValidEmail,ValidCPF, Login } from "../Data/Repository/UserRepository";
import  { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";

export async function PostUser(user: UserRegisterDTO) {
    try
    {
        OpenConnection();

        if(await ValidEmail(user.Email) == false){
            return{
                statusCode: 200,
                data : {
                    message: "E-mail já cadastrado na base de dados!"
                }
            }
        }

        if(await ValidCPF(user.CPF) == false){
            return{
                statusCode: 200,
                data : {
                    message: "CPF já cadastrado na base de dados!"
                }
            }
        }
                
        const result = await Register(user);

        if(result.valid){
            return {
                statusCode: 201,
                data: {
                    message: "Usuário cadastrado com Sucesso!",
                    IdUsuario: result.IdUsuario
                }
            }
        }
        else{
            return{
                statusCode: 400,
                data : {
                    message: "Ocorreu um erro ao cadastrar o usuário!"
                }
            }
        }
    }
    catch(err){
        return{
            statusCode: 500,
            data:{
                message: "Ocorreu um erro ao cadastrar o usuário!"
            }
        }
    }
    finally{
        CloseConnection();
    }
}

export async function DoLogin(user: UserLoginDTO){

    try{

        const result = await Login(user);

        if(result.length > 1){
            return {
                statusCode: 200,
                data: {
                    message: "Usuário autenticado com sucesso!",
                    user: result[0]
                }
            }
        }
        else{
            return{
                statusCode: 200,
                data: {
                    message: "Usuário autenticado com sucesso!"
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