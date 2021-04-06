import  UserLoginDTO from '../../Domain/DTO/User/UserLoginDTO';
import UserRegisterDTO from '../../Domain/DTO/User/UserRegisterDTO';
import { knex } from '../Database/ConfigDataBase';

export async function Register(user: UserRegisterDTO){

    try{

        const IdUsuario = await knex("Usuario").insert(user).returning('IdUsuario');
        return {
            valid: true,
            IdUsuario: IdUsuario[0]
        };
    }   
    catch(err)
    {
        throw "Ocorreu um erro ao cadastrar o usuário!" + err;
    }
}

export async function ValidEmail(email: string){

    try{

        const hasUser = await knex('Usuario').where({
            Email: email
        }).select('IdUsuario');

        if(hasUser.length >= 1)
            return false;
        else
            return true;
    }
    catch(err){
        throw err;
    }
}

export async function ValidCPF(CPF: string){

    try{

        const hasUser = await knex('Usuario').where({
            CPF: CPF
        }).select('IdUsuario');

        if(hasUser.length >= 1)
            return false;
        else
            return true;
    }
    catch(err){
        throw err;
    }

}

export async function Login(user: UserLoginDTO){

    try{

        const result = await knex('Usuario').where({
            Email : user.Email,
            Senha : user.Senha
        });

        return result;

    }
    catch(err){
        throw err;
    }

}