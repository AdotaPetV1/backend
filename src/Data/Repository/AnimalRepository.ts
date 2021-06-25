
import { knex } from "../Database/ConfigDataBase";
import AnimalRegisterDTO  from "../../Domain/DTO/Animal/AnimalRegisterDTO";
import AnimalUpdateDTO from "../../Domain/DTO/Animal/AnimalUpdateDTO";
import { IsNullOrEmpty } from "../../Middleware/Utils/Validators";

export async function SelectAll(UF: string){

    try{

        knex.initialize();
        let result = null;
        if(IsNullOrEmpty(UF)){
            result = await knex('Animal')
            .join('Organizacao','Animal.IdOrgResponsavel','Organizacao.IdOrg')
            .select('Animal.IdAnimal','Animal.Nome',
                'Animal.Raca','Animal.Idade',
                'Organizacao.IdOrg','Organizacao.Nome as OrganizacaoNome',
                'Organizacao.Email','Organizacao.UF','Organizacao.Municipio');
        }else{
            result = await knex('Animal')
            .join('Organizacao','Animal.IdOrgResponsavel','Organizacao.IdOrg')
            .select('Animal.IdAnimal','Animal.Nome',
                'Animal.Raca','Animal.Idade',
                'Organizacao.IdOrg','Organizacao.Nome as OrganizacaoNome',
                'Organizacao.Email','Organizacao.UF','Organizacao.Municipio')
                .where('Organizacao.UF', UF);
        }


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

        //Retorna todos os campos da tabela animal mais os campos selecionados da tabela Organização
        const result = await knex('Animal')
        .join('Organizacao','Animal.IdOrgResponsavel','Organizacao.IdOrg')
        .select('Animal.*','Organizacao.IdOrg','Organizacao.Nome as OrganizacaoNome',
            'Organizacao.Email','Organizacao.UF','Organizacao.Municipio')
            .where('IdAnimal',IdAnimal);

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

export async function HasAnimalWithOng(IdOng: number) {
    try{

        const hasOng = await knex('Animal').where({
            IdOrgResponsavel: IdOng
        }).select('IdOrgResponsavel');

        if(IsNullOrEmpty(hasOng) || hasOng.length == 0){
            return false;
        }
        else{
            return true;
        }
    }   
    catch(err){
        throw err;
    }
}
