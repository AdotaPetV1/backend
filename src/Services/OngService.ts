import { OngRegisterDTO } from "../Domain/DTO/Ong/OngRegisterDTO";
import { OngUpdateDTO} from "../Domain/DTO/Ong/OngUpdateDTO";
import { Register, Update,GetOngByID } from "../Data/Repository/OngRepository";
import { OpenConnection, CloseConnection } from "../Data/Database/UtilsDataBase";
import { IsStringNullOrEmpty, IsNullOrEmpty, ValidarEmail} from "../Middleware/Utils/Validators";
import { CreateResponse } from "../Middleware/Utils/HttpUtils";

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
}

export async function GetAll() {
    
}

export async function Delete(id: number) {
    
}