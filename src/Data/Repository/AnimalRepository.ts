
import { knex } from "../Database/ConfigDataBase";
import AnimalRegisterDTO  from "../../Domain/DTO/Animal/AnimalRegisterDTO";
import AnimalUpdateDTO from "../../Domain/DTO/Animal/AnimalUpdateDTO";

export async function SelectAll(UF: string){

    try{

        knex.initialize();

        //Realizar JOIN com Organização para filtrar por UF
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

export async function SelectByID(IdAnimal : number){
    
    try{
        knex.initialize();

        const result = await knex('Animal').select('*').where('IdAnimal',IdAnimal);

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

        const result = await knex("Animal").insert(Animal).returning('IdAnimal');

        return result;
        
    }
    catch(err){
        throw err;
    }

}

export async function Update(Animal: AnimalUpdateDTO){

    try{
        knex.initialize();

        await knex('Animal')
        .where({ IdAnimal: Animal.IdAnimal })
        .update({
            Nome : Animal.Nome,
            Raca : Animal.Raca,
            Porte : Animal.Porte,
            Idade : Animal.Idade,
            Sexo : Animal.Sexo,
            TipoAnimal : Animal.TipoAnimal,
            Limitacoes : Animal.Limitacoes,
            Descricao : Animal.Descricao,
            Castrado : Animal.Castrado,
            VacinacaoEmDia : Animal.VacinacaoEmDia,
            IdOrgResponsavel : Animal.IdOrgResponsavel
        });

    }
    catch(err){
        throw err;
    }
    finally{
        knex.destroy();
    }
}

export async function Delete(IdAnimal : number) {
    
    try{
        knex.initialize();

        //Talvez depois vamos ter que validar se esse animal está ligado a alguém ou algo assim
        
        await knex('Animal').where('IdAnimal', IdAnimal).del()

    }
    catch(err){
        throw err;
    }
    finally{
        knex.destroy()
    }
}