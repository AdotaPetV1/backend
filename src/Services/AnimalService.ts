import { AnimalRegisterDTO } from "../Domain/DTO/AnimalDTO";
import { Index, Post } from "../Data/Repository/AnimalRepository";
import { IsNullOrEmpty,IsStringNullOrEmpty } from "../Middleware/Utils/Validators";

export async function GetAll(UF: string){

    try{
    
        if(UF == null || UF == ""){
            return {
                statusCode: 400,
                message: "UF não pode ser nula!"
            }
        }

        const result = await Index(UF);

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

export async function PostAnimal(Animal : AnimalRegisterDTO){
    try{

        if(IsStringNullOrEmpty(Animal.Nome))
            return {  statusCode: 400, message : "O campo Nome não pode ser nulo!" }

        if(IsNullOrEmpty(Animal.Idade))
            return { statusCode: 400, message: "O campo Idade não pode ser nulo!" }

        if(IsNullOrEmpty(Animal.TipoAnimal))
            return { statusCode: 400, message: "O campo TipoAnimal não pode ser nulo!" }

        if(IsStringNullOrEmpty(Animal.IdOrgResponsavel))
            return { statusCode: 400, message: "O campo IdOrgResponsavel não pode ser nulo!"}

        if(IsStringNullOrEmpty(Animal.Descricao))
            Animal.Descricao = "Animal sem descrição";
            
        //Caso não informe se o animal foi cadastrado vamos colocar como falso
        if(IsNullOrEmpty(Animal.Castrado))
            Animal.Castrado = false;

        if(IsNullOrEmpty(Animal.VacinacaoEmDia))
            Animal.VacinacaoEmDia = false;
        
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