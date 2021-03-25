export class UserRegisterDTO{
    Nome!: string;
    CPF!: string;
    Email!: string;
    Senha!: string;
    Numero!: string;
    Endereco!: string;
    Municipio!: string;
    CEP!: string;
    UF!:string;
}

export class UserLoginDTO {
    Email!: string;
    Senha!: string;
}