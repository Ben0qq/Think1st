import type { FormData } from "./types"

export const setFieldValue=(name:string, formData:FormData, setValue: (formdata:FormData)=>void, value:any)=>{
    setValue({...formData, [name]:value});
}

export const deafultFormError = {
    firstName:"",
        lastName:"",
        email:"",
        age:"",
        photo:"",
        day:"",
        hour:""
}