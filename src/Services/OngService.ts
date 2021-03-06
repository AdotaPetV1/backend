import { OngRegisterDTO } from "../Domain/DTO/Ong/OngRegisterDTO";
import { OngUpdateDTO} from "../Domain/DTO/Ong/OngUpdateDTO";
import { Register, Update,GetOngByID, GetAllOng, DeleteONG } from "../Data/Repository/OngRepository";
import { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";
import { IsStringNullOrEmpty, IsNullOrEmpty, ValidarEmail} from "../Middleware/Utils/Validators";
import { CreateResponse } from "../Middleware/Utils/HttpUtils";
import { HasAnimalWithOng } from "../Data/Repository/AnimalRepository";

export async function PostOng(ong: OngRegisterDTO) {
    try {

        OpenConnection();

        if(await ValidarEmail(ong.Email))
            return CreateResponse(200,"Email já cadastrado na base de dados", null);

        if(IsStringNullOrEmpty(ong.Nome))
            return CreateResponse(200,"O Campo nome não pode ser vazio!",null);

        if(IsStringNullOrEmpty(ong.CNPJ))
            return CreateResponse(200,"O campo CNPJ não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.Senha))
            return CreateResponse(200,"O campo Senha não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.Numero))
            return CreateResponse(200,"O campo Numero não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.Endereco))
            return CreateResponse(200,"O campo Endereco não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.Municipio))
            return CreateResponse(200,"O campo Municipio não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.CEP))
            return CreateResponse(200,"O campo CEP não pode ser vazio!", null);
        
        if(IsStringNullOrEmpty(ong.UF))
            return CreateResponse(200,"O campo UF não pode ser vazio!", null);
        
        if(IsStringNullOrEmpty(ong.CaixaPostal))
            ong.CaixaPostal = "";

        await Register(ong);

        return CreateResponse(201,"Ong Cadastrada com Sucesso!",null);

    }
    catch (err) {
        return {
            statusCode: 500,
            data: {
                message: "Erro ao cadastrar a Ong!" + err.message 
            }
        }
    }
    finally {
        CloseConnection();
    }
}

export async function PutOrg(ong: OngUpdateDTO) {

    try{

        OpenConnection();

        if(await ValidarEmail(ong.Email))
            return CreateResponse(200,"Email já cadastrado na base de dados", null);

        if(IsStringNullOrEmpty(ong.Nome))
            return CreateResponse(200,"O Campo nome não pode ser vazio!",null);

        if(IsStringNullOrEmpty(ong.CNPJ))
            return CreateResponse(200,"O campo CNPJ não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.Senha))
            return CreateResponse(200,"O campo Senha não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.Numero))
            return CreateResponse(200,"O campo Numero não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.Endereco))
            return CreateResponse(200,"O campo Endereco não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.Municipio))
            return CreateResponse(200,"O campo Municipio não pode ser vazio!", null);

        if(IsStringNullOrEmpty(ong.CEP))
            return CreateResponse(200,"O campo CEP não pode ser vazio!", null);
        
        if(IsStringNullOrEmpty(ong.UF))
            return CreateResponse(200,"O campo UF não pode ser vazio!", null);

        await Update(ong);

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

export async function GetById(ID : number) {
    try{
        
        OpenConnection();

        if(IsNullOrEmpty(ID)){
            return CreateResponse(200, "O campo ID não pode ser null",null);
        }

        const result = await GetOngByID(ID);

        if(IsNullOrEmpty(result) || result.length > 0)
            return CreateResponse(200, "Não encontramos nenhuma ONG com esse ID na nossa base de dados!",null);
        else
            return CreateResponse(200,"",result);
    }
    catch(err){
        return CreateResponse(500, "Ocorreu um erro ao tentar buscar a ong pelo ID!" + err.message, null);
    }
    finally{
        CloseConnection();
    }
}

export async function GetAll() {
    try{

        OpenConnection();

        const result = await GetAllOng();

        return CreateResponse(200, "", result);

    }
    catch(err){
        return CreateResponse(500, "Ocorreu um erro ao tentar buscar a ong pelo ID!" + err.message, null);
    }
    finally{
        CloseConnection();
    }
}

export async function Delete(ID: number) {

    try{

        OpenConnection();

        if(IsNullOrEmpty(ID)){
            return CreateResponse(400, "Favor passar um ID válido!",null);
        }

        const hasAnimalRegister = await HasAnimalWithOng(ID);

        if(hasAnimalRegister)
            return CreateResponse(200, "Não foi possível excluir a ONG, pois existem animais vinculados a ela!", null);

        await DeleteONG(ID);
        return CreateResponse(200, "ONG excluída com sucesso!", null);
    }
    catch(err){
        return CreateResponse(500, "Ocorreu um erro ao tentar deletar a ONG!", null);
    }
    finally{
        CloseConnection();
    }
}
