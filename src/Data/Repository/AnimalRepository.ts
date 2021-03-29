
import { knex } from "../Database/ConfigDataBase";

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
