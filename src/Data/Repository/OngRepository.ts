import LoginDTO from "../../Domain/DTO/Auth/LoginDTO";
import { OngRegisterDTO } from "../../Domain/DTO/Ong/OngRegisterDTO";
import { OngUpdateDTO } from "../../Domain/DTO/Ong/OngUpdateDTO";
import { knex } from '../Database/ConfigDataBase';

export async function Register(ong: OngRegisterDTO) {

    try {

       await knex("Organizacao").insert({
            Nome: ong.Nome,
            CNPJ: ong.CNPJ,
            Email: ong.Email,
            Senha: ong.Senha,
            Numero: ong.Numero,
            Site: ong.Site,
            Instagram: ong.Instagram,
            Facebook: ong.Facebook,
            Vakaquinha: ong.Vakaquinha,
            Endereco: ong.Endereco,
            Municipio: ong.Municipio,
            CEP: ong.CEP,
            UF: ong.UF,
            CaixaPostal: ong.CaixaPostal
        });
    }
    catch (err) {
        throw "Ocorreu um erro ao cadastrar a Ong" + err;
    }
}

export async function HasOngWithEmail(email: string) {

    try {

        const hasOng = await knex('Organizacao').where({
            Email: email
        }).select('IdOrg');

        if (hasOng.length >= 1)
            return true;
        else
            return false;
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

export async function Update(Ong : OngUpdateDTO) {
 
    try{

        await knex('Organizacao')
        .where({ IdOrg : Ong.IdOrg}).update({
            Nome: Ong.Nome,
            CNPJ: Ong.CNPJ,
            Email: Ong.Email,
            Senha: Ong.Senha,
            Numero: Ong.Numero,
            Site: Ong.Site,
            Instagram: Ong.Instagram,
            Facebook: Ong.Facebook,
            Vakaquinha: Ong.Vakaquinha,
            Endereco: Ong.Endereco,
            Municipio: Ong.Municipio,
            CEP: Ong.CEP,
            UF: Ong.UF,
            CaixaPostal: Ong.CaixaPostal,
            TokenRecuperacao: Ong.TokenRecuperacao
        });
        
    }
    catch(err){
        throw err;
    }
    finally{

    }
}

export async function FindOngByEmail(email: string){

    try{
        const ong = await knex('Organizacao').column('IdOrg', 'Nome', 'Email','TokenRecuperacao')
        .where({Email : email})
        .select();
    
        return ong[0];
    }
    catch(err)
    {
        throw err;
    }

}