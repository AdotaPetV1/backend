
export function CreateResponse(statusCode: number,message: string, data: any){

    if(data == null){
        return{
            statusCode: statusCode,
            data: {
                message: message
            }
        }
    }
    else{
        return {
            statusCode: statusCode,
            data: data
        }
    }
}