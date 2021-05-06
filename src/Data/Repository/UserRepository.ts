import LoginDTO from '../../Domain/DTO/Auth/LoginDTO';
import UserRegisterDTO from '../../Domain/DTO/User/UserRegisterDTO';
import UserUpdateDTO from '../../Domain/DTO/User/UserUpdateDTO';
import { knex } from '../Database/ConfigDataBase';

export async function Register(user: UserRegisterDTO) {

    try {

        const IdUsuario = await knex("Usuario").insert({
            Nome: user.Nome,
            CPF: user.CPF,
            Email: user.Email,
            Senha: user.Senha,
            Numero: user.Numero,
            Endereco: user.Endereco,
            Municipio: user.Municipio,
            CEP: user.CEP,
            UF: user.UF
        }).returning('IdUsuario');

        return {
            valid: true,
            IdUsuario: IdUsuario[0]
        };
    }
    catch (err) {
        throw "Ocorreu um erro ao cadastrar o usuário!" + err;
    }
}

export async function ValidEmail(email: string) {

    try {

        const hasUser = await knex('Usuario').where({
            Email: email
        }).select('IdUsuario');

        if (hasUser.length >= 1)
            return false;
        else
            return true;
    }
    catch (err) {
        throw err;
    }
}

export async function ValidCPF(CPF: string) {

    try {

        const hasUser = await knex('Usuario').where({
            CPF: CPF
        }).select('IdUsuario');

        if (hasUser.length >= 1)
            return false;
        else
            return true;
    }
    catch (err) {
        throw err;
    }

}

export async function Login(user: LoginDTO) {

    try {

        const result = await knex('Usuario').where({
            Email: user.Email,
            Senha: user.Senha
        });

        return result;

    }
    catch (err) {
        throw err;
    }

}

<<<<<<< HEAD
export async function Update(Usuario: UserUpdateDTO) {

    try {
        knex.initialize();

        await knex('Usuario')
            .where({ IdUsuario: Usuario.IdUsuario })
            .update({
                Nome: Usuario.Nome,
                CPF: Usuario.CPF,
                Email: Usuario.Email,
                Senha: Usuario.Senha,
                Numero: Usuario.Numero,
                Endereco: Usuario.Endereco,
                Municipio: Usuario.Municipio,
                CEP: Usuario.CEP,
                UF: Usuario.UF,

            });

    }
    catch (err) {
        throw err;
    }
    finally {
        knex.destroy();
    }
=======
export async function FindUserByEmail(email: string){

    try{
        const user = await knex('Usuario').column('IdUsuario', 'Nome', 'Email')
        .where({Email : email})
        .select();
    
        return user[0];
    }
    catch(err)
    {
        throw err;
    }

>>>>>>> 4707a4647f2454e43dc4e49a4d31a9bb61b21a80
}