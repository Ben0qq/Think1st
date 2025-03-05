import type { InputHTMLAttributes } from "react";
import type { FormData, FormError } from "./types";
import { Error } from "./Error";
import classNames from "classnames";


type Props = {
    label:string;
    name:keyof FormData;
    formData:FormData;
    setValue: (formdata:FormData)=>void;
    errors: FormError;
}

export const Input:React.FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({label,name,formData,setValue,errors,...props}) =>{
    return <label className="text-base flex flex-col gap-y-2">
    {label}
    <input {...props} onChange={(e)=>{setValue({...formData, [name]:e.target.value});}} className={classNames(" rounded-lg h-12 focus:border-2 focus:border-[#761BE4] focus:bg-[#FAF9FA] ",{"bg-white border border-[#CBB6E5]":!errors[name],"border-2 border-[#ED4545] bg-[#FEECEC]":errors[name]})}/>
    {errors[name]&&<Error error={errors[name]}/>}
</label>
}