import  { UserRegisterDTO, UserLoginDTO }  from "../Domain/DTO/UserDTO";
import { Register,ValidEmail,ValidCPF, Login } from "../Data/Repository/UserRepository";

export async function PostUser(user: UserRegisterDTO) {
    try
    {
        // console.log(await ValidEmail(user.Email))
        // if(await ValidEmail(user.Email) == false){
        //     return{
        //         statusCode: 200,
        //         message: "E-mail já cadastrado na base de dados!"
        //     }
        // }

        // if(await ValidCPF(user.CPF) == false){
        //     return{
        //         statusCode: 200,
        //         message: "CPF já cadastrado na base de dados!"
        //     }
        // }
                
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
        console.log(err)
        return{
            statusCode: 500,
            message: "Ocorreu um erro ao cadastrar o usuário!"
        }
    }
}

export async function DoLogin(user: UserLoginDTO){

    try{

        const result = await Login(user);

        if(result.length > 1){
            return {
                statusCode: 201,
                message: "Usuário autenticado com sucesso!"
            }
        }
    }
    catch(err){
        return{
            statusCode: 500,
            message: "Ocorreu um erro ao realizar o login!"
        }
    }
}