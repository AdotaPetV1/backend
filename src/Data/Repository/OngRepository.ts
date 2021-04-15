import LoginDTO from "../../Domain/DTO/Auth/LoginDTO";
import { OngRegisterDTO } from "../../Domain/DTO/Ong/OngRegisterDTO";
import { knex } from '../Database/ConfigDataBase';

export async function Register(ong: OngRegisterDTO) {

    try {

        const IdOng = await knex("Organizacao").insert(ong).returning('IdOng');
        return {
            valid: true,
            IdOng: IdOng[0]
        };
    }
    catch (err) {
        throw "Ocorreu um erro ao cadastrar a Ong" + err;
    }
}

export async function ValidEmail(email: string) {

    try {

        const hasOng = await knex('Organizacao').where({
            Email: email
        }).select('IdOrg');

        if (hasOng.length >= 1)
            return false;
        else
            return true;
    }
    catch (err) {
        throw err;
    }
}

export async function ValidCPF(CNPJ: string) {

    try {

        const hasOng = await knex('Organizacao').where({
            CNPJ: CNPJ
        }).select('IdOng');

        if (hasOng.length >= 1)
            return false;
        else
            return true;
    }
    catch (err) {
        throw err;
    }

}

export async function Login(ong: LoginDTO) {

    try {

        const result = await knex('Organizacao').where({
            Email: ong.Email,
            Senha: ong.Senha
        });

        return result;

    }
    catch (err) {
        throw err;
    }

}

export async function  GetOngByID(IdOrg: number) {
    
    try{

        const result = await knex('Organizacao').where('IdOrg',IdOrg);

        return result[0];
    }
    catch(err)
    {
        throw err;
    }
    finally{
    }
}