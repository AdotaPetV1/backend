import { OngLoginDTO } from "../../Domain/DTO/Ong/OngLoginDTO";
import { OngRegisterDTO } from "../../Domain/DTO/Ong/OngRegisterDTO";
import { knex } from '../Database/ConfigDataBase';

export async function Register(ong: OngRegisterDTO) {

    try {

        const IdOng = await knex("Ong").insert(ong).returning('IdOng');
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

        const hasOng = await knex('Ong').where({
            Email: email
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

export async function ValidCNPJ(CNPJ: string) {

    try {

        const hasOng = await knex('Ong').where({
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

export async function Login(ong: OngLoginDTO) {

    try {

        const result = await knex('Ong').where({
            Email: ong.Email,
            Senha: ong.Senha
        });

        return result;

    }
    catch (err) {
        throw err;
    }

}