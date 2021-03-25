import { AnimalRegisterDTO } from "../Domain/DTO/AnimalDTO";
import { Index } from "../Data/Repository/AnimalRepository";

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