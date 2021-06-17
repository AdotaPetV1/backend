import { HasUserWithEmail,ValidCPF} from "../../Data/Repository/UserRepository";
import { HasOngWithEmail } from "../../Data/Repository/OngRepository";

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
    
    if(await HasOngWithEmail(email))
        return true;
    if(await HasUserWithEmail(email))
        return true;
    else 
        return false;
}

//Cria um token aleatório utilizado para recuperar a senha 
export async function GerarTokenAleatorio(length : number){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}