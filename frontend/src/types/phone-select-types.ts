export interface PhoneSelectData{
    country:{
        code:string,
        name:string,
        dialCode:string,
    }
    nationalNumber:string,
    fullNumber:string,
    isValid:boolean
}