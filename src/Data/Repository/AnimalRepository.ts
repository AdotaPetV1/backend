
import { knex } from "../Database/ConfigDataBase";

export async function Index(UF: string){

    try{

        knex.initialize();
        
        //SELECT IdAnimal, Nome,Raca,Idade FROM Animal
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

// module.exports = {

//     //funçao Get
//     async index(req, res) =>({
//         //SQL -> SELECT IdAnimal FROM Animal
//         const results = await knex.select('IdAnimal').from('Animal').then((results) => 
//         res.json(results))
//     }),
//     //funçao Post
//     async create(req, res, next){
//         //TryCatch para verificar se tudo o que o usuário inseriu esta de acordo com o que necessita na tabela
        
//         try {
//             const {Nome, Raca, Porte, Idade, Sexo, TipoAnimal, Limitacoes,
//                 Descricao, Castrado, VacinacaoEmDia} = req.body
//          await knex('Animal').insert({
//              Nome:'', 
//              Raca:'',
//              Porte:'',
//              Idade:'',
//              Sexo:'',
//              TipoAnimal:'',
//              Limitacoes:'',
//              Descricao:'',
//              Castrado:'',
//              VacinacaoEmDia:'',    
//          })  
//         } catch (error) {
//             next (error);
//             }
            
//         }
        
//     }
