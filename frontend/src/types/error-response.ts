export interface ApiErrorResponse{
    response:{
        data:{
            error:string,
            msg:string,
        }
        status:number
    }
}