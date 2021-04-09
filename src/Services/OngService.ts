import { OngRegisterDTO } from "../Domain/DTO/Ong/OngRegisterDTO";
import { OngLoginDTO } from "../Domain/DTO/Ong/OngLoginDTO";
import { Register, ValidEmail, ValidCPF, Login } from "../Data/Repository/OngRepository";
import { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";

export async function PostOng(ong: OngRegisterDTO) {
    try {
        OpenConnection();

        if (await ValidEmail(ong.Email) == false) {
            return {
                statusCode: 200,
                data: {
                    message: "E-mail já cadastrado!"
                }
            }
        }

        if (await ValidCPF(ong.CPF) == false) {
            return {
                statusCode: 200,
                data: {
                    message: "CPF já cadastrado!"
                }
            }
        }

        const result = await Register(ong);

        if (result.valid) {
            return {
                statusCode: 201,
                data: {
                    message: "Ong cadastrada!",
                    IdUsuario: result.IdOng
                }
            }
        }
        else {
            return {
                statusCode: 400,
                data: {
                    message: "Erro ao cadastrar a Ong!"
                }
            }
        }
    }
    catch (err) {
        return {
            statusCode: 500,
            data: {
                message: "Erro ao cadastrar a Ong!"
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
                    message: "Ong autenticada!",
                    user: result[0]
                }
            }
        }
        else {
            return {
                statusCode: 200,
                data: {
                    message: "Ong autenticada!"
                }
            }
        }
    }
    catch (err) {
        return {
            statusCode: 500,
            data: {
                message: "Erro ao realizar login!"
            }
        }
    }
}