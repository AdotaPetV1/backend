import { ValidEmail as ValidUserEmail,ValidCPF} from "../../Data/Repository/UserRepository";
import { ValidEmail as ValidOngEmail } from "../../Data/Repository/OngRepository";

export function IsStringNullOrEmpty(value : string){

    if(value == null || value == "" || value == undefined)
        return true;
    else
        return false;
}

export function IsNullOrEmpty(value : any){
    if(value == null || value == undefined)
    return true;
else
    return false;
}

//Valida se o e-mail já está cadastrado na base de dados
export async function ValidarEmail(email:string) {
    
    if(await ValidUserEmail(email) == false)
        return false;
    if(await ValidOngEmail(email) == false)
        return false
    else 
        return true;
}

export async function GerarTokenAleatorio(length : number){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}