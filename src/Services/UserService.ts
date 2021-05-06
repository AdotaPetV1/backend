<<<<<<< HEAD
import UserRegisterDTO from "../Domain/DTO/User/UserRegisterDTO";
import UserUpdateDTO from "../Domain/DTO/User/UserUpdateDTO"
import { Register, ValidCPF } from "../Data/Repository/UserRepository";
import { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";
import { ValidarEmail } from "../Middleware/Utils/Validators";
import { IsNullOrEmpty, IsStringNullOrEmpty } from "../Middleware/Utils/Validators";
import { Update } from "../Data/Repository/UserRepository"
=======
import  UserRegisterDTO from "../Domain/DTO/User/UserRegisterDTO";
import  { Register, ValidCPF } from "../Data/Repository/UserRepository";
import  { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";
import  { ValidarEmail } from "../Middleware/Utils/Validators";
>>>>>>> 4707a4647f2454e43dc4e49a4d31a9bb61b21a80

export async function PostUser(user: UserRegisterDTO) {
    try {
        OpenConnection();
        let EmailValido = await ValidarEmail(user.Email);
        if (!EmailValido) {
            return {
                statusCode: 200,
                data: {
                    message: "E-mail já cadastrado na base de dados!"
                }
            }
        }

        let CPFValido = await ValidCPF(user.CPF);
        if (CPFValido == false) {
            return {
                statusCode: 200,
                data: {
                    message: "CPF já cadastrado na base de dados!"
                }
            }
        }

        if (user.UF.length >= 2)
            return { statusCode: 400, message: "Favor inserir uma UF no formato válido!" }

        const result = await Register(user);

        if (result.valid) {
            return {
                statusCode: 201,
                data: {
                    message: "Usuário cadastrado com Sucesso!",
                    IdUsuario: result.IdUsuario
                }
            }
        }
        else {
            return {
                statusCode: 400,
                data: {
                    message: "Ocorreu um erro ao cadastrar o usuário!"
                }
            }
        }
    }
    catch (err) {
        return {
            statusCode: 500,
            data: {
                message: "Ocorreu um erro ao cadastrar o usuário!"
            }
        }
    }
    finally {
        CloseConnection();
    }
}
export async function UpdateUser(user: UserUpdateDTO) {

    try {

        if (IsStringNullOrEmpty(user.Nome))
            return { statusCode: 400, message: "O campo Nome não pode ser nulo!" }

        if (IsNullOrEmpty(user.CPF))
            return { statusCode: 400, message: "O campo Cpf não pode ser nulo!" }

        if (IsNullOrEmpty(user.Email))
            return { statusCode: 400, message: "O campo Email não pode ser nulo!" }

        if (IsNullOrEmpty(user.Senha))
            return { statusCode: 400, message: "O campo Senha não pode ser nulo!" }

        if (IsNullOrEmpty(user.Numero))
            return { statusCode: 400, message: "O campo Numero não pode ser nulo!" }

        if (IsNullOrEmpty(user.Endereco))
            return { statusCode: 400, message: "O campo Endereco não pode ser nulo!" }

        if (IsNullOrEmpty(user.Municipio))
            return { statusCode: 400, message: "O campo Municipio não pode ser nulo!" }

        if (IsNullOrEmpty(user.CEP))
            return { statusCode: 400, message: "O campo Cep não pode ser nulo!" }

        if (IsNullOrEmpty(user.UF))
            return { statusCode: 400, message: "O campo UF não pode ser nulo!" }


        //implementar depois validação do IdOrg para ver se a Org existe
        const result = await Update(user);

        return { statusCode: 200, message: "Usuário atualizado com sucesso!", data: result }
    }
    catch (err) {
        return {
            statusCode: 500,
            message: `Ocorreu um erro ao atualizar o Usuário! Erro: ${err.toString()}`
        }
    }
}
