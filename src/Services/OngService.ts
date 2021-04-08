import { OngRegisterDTO } from "../Domain/DTO/Ong/OngRegisterDTO";
import { OngLoginDTO } from "../Domain/DTO/Ong/OngLoginDTO";
import { Register, ValidEmail, ValidCNPJ, Login } from "../Data/Repository/OngRepository";
import { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";

export async function PostOng(ong: OngRegisterDTO) {
    try {
        OpenConnection();

        if (await ValidEmail(ong.Email) == false) {
            return {
                statusCode: 200,
                data: {
                    message: "E-mail já cadastrado na base de dados!"
                }
            }
        }

        if (await ValidCNPJ(ong.CNPJ) == false) {
            return {
                statusCode: 200,
                data: {
                    message: "CNPJ já cadastrado na base de dados!"
                }
            }
        }

        const result = await Register(ong);

        if (result.valid) {
            return {
                statusCode: 201,
                data: {
                    message: "Ong cadastrada com Sucesso!",
                    IdUsuario: result.IdOng
                }
            }
        }
        else {
            return {
                statusCode: 400,
                data: {
                    message: "Ocorreu um erro ao cadastrar a Ong!"
                }
            }
        }
    }
    catch (err) {
        return {
            statusCode: 500,
            data: {
                message: "Ocorreu um erro ao cadastrar a Ong!"
            }
        }
    }
    finally {
        CloseConnection();
    }
}

export async function DoLogin(ong: OngLoginDTO) {

    try {

        const result = await Login(ong);

        if (result.length > 1) {
            return {
                statusCode: 200,
                data: {
                    message: "Ong autenticada com sucesso!",
                    user: result[0]
                }
            }
        }
        else {
            return {
                statusCode: 200,
                data: {
                    message: "Ong autenticada com sucesso!"
                }
            }
        }
    }
    catch (err) {
        return {
            statusCode: 500,
            data: {
                message: "Ocorreu um erro ao realizar o login!"
            }
        }
    }
}