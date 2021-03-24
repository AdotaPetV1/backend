import UserRegisterDTO from '../../Domain/DTO/UserDTO';
import { knex } from '../Database/ConfigDataBase';

export async function Register(user: UserRegisterDTO){

    try{

        knex.initialize();

        const IdUsuario = await knex("Usuario").insert(user).returning('IdUsuario');

        return {
            valid: true,
            IdUsuario: IdUsuario[0]
        };
    }   
    catch(err)
    {
        throw new Error("Ocorreu um erro ao cadastrar o usuário!");
    }
    finally
    {
        knex.destroy();
    }

}


export async function ValidEmail(email: string){

    try{

        knex.initialize();

        const hasUser = await knex('Usuario').where({
            Email: email
        }).select('IdUsuario');

        if(hasUser == null)
            return true;
        else
            return false;
    }
    catch(err){

    }
    finally{

        knex.destroy();
    }   
}

export async function ValidCPF(CPF: string){

    try{

        knex.initialize();

        const hasUser = await knex('Usuario').where({
            CPF: CPF
        }).select('IdUsuario');

        if(hasUser == null)
            return true;
        else
            return false;
    }
    catch(err){

    }
    finally{

        knex.destroy();
    }   
}