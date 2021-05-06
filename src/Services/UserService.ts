import  UserRegisterDTO from "../Domain/DTO/User/UserRegisterDTO";
import  { Register, ValidCPF } from "../Data/Repository/UserRepository";
import  { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";
import  { ValidarEmail } from "../Middleware/Utils/Validators";

export async function PostUser(user: UserRegisterDTO) {
    try
    {
        OpenConnection();
        let EmailValido = await ValidarEmail(user.Email);
        if(!EmailValido){
            return{
                statusCode: 200,
                data : {
                    message: "E-mail já cadastrado na base de dados!"
                }
            }
        }

        let CPFValido = await ValidCPF(user.CPF);
        if(CPFValido == false){
            return{
                statusCode: 200,
                data : {
                    message: "CPF já cadastrado na base de dados!"
                }
            }
        }
        
        if(user.UF.length >= 2)
            return{ statusCode: 400, message: "Favor inserir uma UF no formato válido!" }

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
