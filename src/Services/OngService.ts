import { OngRegisterDTO } from "../Domain/DTO/Ong/OngRegisterDTO";
import { OngUpdateDTO} from "../Domain/DTO/Ong/OngUpdateDTO";
import { Register, ValidEmail as ValidOngEmail, Update } from "../Data/Repository/OngRepository";
import { ValidCPF, ValidEmail as ValidUserEmail} from "../Data/Repository/UserRepository";
import { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";

export async function PostOng(ong: OngRegisterDTO) {
    try {
        OpenConnection();

        if (await !ValidOngEmail(ong.Email) || !ValidUserEmail(ong.Email)) {
            return {
                statusCode: 200,
                data: {
                    message: "E-mail já cadastrado!"
                }
            }
        }

        if (await ValidCPF(ong.CNPJ) == false) {
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

export async function PutOrg(Ong: OngUpdateDTO) {

    try{
        OpenConnection();

        await Update(Ong);

        return {
            statusCode: 200,
            data: {
                message: "Ong atualizada com Sucesso!",
            }
        }
    }
    catch(err){
        return {
            statusCode: 500,
            data: {
                message: "Erro ao atualizar a Ong!"
            }
        }
    }
    finally{
        CloseConnection();
    }
}
