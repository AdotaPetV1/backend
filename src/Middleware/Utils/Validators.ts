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