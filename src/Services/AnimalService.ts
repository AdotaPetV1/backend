import  AnimalRegisterDTO from "../Domain/DTO/Animal/AnimalRegisterDTO";
import { SelectAll,SelectByID, Post,Update,Delete } from "../Data/Repository/AnimalRepository";
import AnimalUpdateDTO from "../Domain/DTO/Animal/AnimalUpdateDTO";
import { IsNullOrEmpty,IsStringNullOrEmpty } from "../Middleware/Utils/Validators";

export async function GetAll(UF: string){

    try{
    
        if(UF == null || UF == ""){
            return {
                statusCode: 400,
                message: "UF não pode ser nula!"
            }
        }

        const result = await SelectAll(UF);

        return{
            statusCode: 200,
            data: result
        }
    }
    catch(err){
        return {
            statusCode: 500,
            message: "Ocorreu um erro ao buscar os animais!"
        }
    }
}

export async function GetAnimalByID(ID: number){
    
    try{

        if(IsNullOrEmpty(ID)){
            return {  statusCode: 400, message: "Favor passar um ID válido!" }
        }
    
        const result = await SelectByID(ID);
    
        if(result.length > 0)
            return { statusCode: 200, data: result[0] }
        else
            return { statusCode: 200, message: "Não encontramos animal com esse ID na nossa base de dados!"}

    }
    catch(err){
        return {
            statusCode: 500,
            message: `Ocorreu um erro ao buscar o animal! Erro: ${err.toString()}`
        }
    }

}

export async function PostAnimal(Animal : AnimalRegisterDTO){

    try{

        if(IsStringNullOrEmpty(Animal.Nome))
            return {  statusCode: 400, message : "O campo Nome não pode ser nulo!" }

        if(IsNullOrEmpty(Animal.Idade))
            return { statusCode: 400, message: "O campo Idade não pode ser nulo!" }

        if(IsNullOrEmpty(Animal.TipoAnimal))
            return { statusCode: 400, message: "O campo TipoAnimal não pode ser nulo!" }

        if(IsNullOrEmpty(Animal.IdOrgResponsavel))
            return { statusCode: 400, message: "O campo IdOrgResponsavel não pode ser nulo!"}

        if(IsStringNullOrEmpty(Animal.Descricao))
            Animal.Descricao = "Animal sem descrição";
            
        //Caso não informe se o animal foi cadastrado vamos colocar como falso
        if(IsNullOrEmpty(Animal.Castrado))
            Animal.Castrado = false;

        if(IsNullOrEmpty(Animal.VacinacaoEmDia))
            Animal.VacinacaoEmDia = false;
        
        //implementar depois validação do IdOrg para ver se a Org existe
        const result = await Post(Animal);

        return { statusCode: 200, message: "Animal cadastrado com sucesso!", data: result }
    }
    catch(err){
        return {
            statusCode: 500,
            message: `Ocorreu um erro ao cadastrar os animais! Erro: ${err.toString()}`
        }
    }

}

export async function UpdateAnimal(Animal : AnimalUpdateDTO) {

    try{
        if(IsNullOrEmpty(Animal.IdAnimal))
            return { statusCode: 400, message: "O campo IdAnimal não pode ser nulo!" }
        if(IsStringNullOrEmpty(Animal.Nome))
            return {  statusCode: 400, message : "O campo Nome não pode ser nulo!" }

        if(IsNullOrEmpty(Animal.Idade))
            return { statusCode: 400, message: "O campo Idade não pode ser nulo!" }

        if(IsNullOrEmpty(Animal.TipoAnimal))
            return { statusCode: 400, message: "O campo TipoAnimal não pode ser nulo!" }

        if(IsNullOrEmpty(Animal.IdOrgResponsavel))
            return { statusCode: 400, message: "O campo IdOrgResponsavel não pode ser nulo!"}

        if(IsStringNullOrEmpty(Animal.Descricao))
            Animal.Descricao = "Animal sem descrição";
            
        //Caso não informe se o animal foi cadastrado vamos colocar como falso
        if(IsNullOrEmpty(Animal.Castrado))
            Animal.Castrado = false;

        if(IsNullOrEmpty(Animal.VacinacaoEmDia))
            Animal.VacinacaoEmDia = false;
        
        //implementar depois validação do IdOrg para ver se a Org existe
        const result = await Update(Animal);

        return { statusCode: 200, message: "Animal atualizado com sucesso!", data: result }
    }
    catch(err){
        return {
            statusCode: 500,
            message: `Ocorreu um erro ao atualizar o animal! Erro: ${err.toString()}`
        }
    }
}

export async function DeleteAnimal(IdAnimal: number) {
    
    try{
        
        if(IsNullOrEmpty(IdAnimal)){
            return {  statusCode: 400, message: "Favor passar um ID válido!" }
        }

        await Delete(IdAnimal);

        return { statusCode: 200, message:"Animal excluído com sucesso!" }

    }
    catch(err){
        return { statusCode: 500, message: `Ocorreu um erro ao deletar o animal! Erro: ${err.toString()}`}
    }
}