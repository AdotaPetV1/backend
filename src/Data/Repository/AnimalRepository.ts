
import { knex } from "../Database/ConfigDataBase";
import { AnimalRegisterDTO } from "../../Domain/DTO/AnimalDTO";

export async function Index(UF: string){

    try{

        knex.initialize();

        const result = await knex('Animal').select('IdAnimal','Nome','Raca','Idade');

        return result;

    }
    catch(err){
        throw err;
    }
    finally{

        knex.destroy();
        
    }
}


export async function Post(Animal : AnimalRegisterDTO) {
    
    try{

        knex.initialize();

        const result = await knex("Animal").insert(Animal).returning('IdAnimal');

        return result;
        
    }
    catch(err){
        throw err;
    }
    finally{

        knex.destroy();
        
    }
    
}