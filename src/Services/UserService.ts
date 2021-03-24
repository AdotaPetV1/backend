import UserRegisterDTO from "../Domain/DTO/UserDTO";
import { Register,ValidEmail,ValidCPF } from "../Data/Repository/UserRepository";

export async function PostUser(user: UserRegisterDTO) {
    try
    {
        if(await ValidEmail(user.Email) == false){
            return{
                statusCode: 200,
                message: "E-mail já cadastrado na base de dados!"
            }
        }

        if(await ValidCPF(user.CPF) == false){
            return{
                statusCode: 200,
                message: "CPF já cadastrado na base de dados!"
            }
        }
                
        const result = await Register(user);

        if(result.valid){
            return {
                statusCode: 201,
                message: "Usuário cadastrado com Sucesso!",
                IdUsuario: result.IdUsuario
            }
        }
        else{
            return{
                statusCode: 400,
                message: "Ocorreu um erro ao cadastrar o usuário!"
            }
        }
    }
    catch(err){
        return{
            statusCode: 500,
            message: "Ocorreu um erro ao cadastrar o usuário!"
        }
    }
}