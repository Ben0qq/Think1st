import { type ChangeEvent, type InputHTMLAttributes } from "react";
import { DeleteButton } from "./DeleteButton";
import type { FormData, FormError } from "./types";
import { Error } from "./Error";

type Props = {
    label:string;
    name:keyof FormData;
    formData:FormData;
    errors: FormError;
    setValue: (formdata:FormData)=>void;
}

export const FileUploader:React.FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({label,name,formData,setValue,errors,...props}) =>{
    const onFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target.files) setValue({...formData, [name]:e.target.files[0]});
      };

      const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = e.dataTransfer;
        if (droppedFiles?.files&&droppedFiles?.files.length > 0) {
            setValue({...formData, [name]:droppedFiles.files[0]});
        }
      };

    return <>
    <p className="text-base flex flex-col gap-y-2">{label}</p>
    <div className="rounded-lg border border-[#CBB6E5] bg-white h-24 flex justify-center items-center" onDrop={handleDrop} draggable={true}
        onDragOver={(event) => event.preventDefault()}>
            {formData[name]?
            <div className="flex gap-x-2">
                <p className="font-medium">{(formData[name] as File).name}</p>
                <DeleteButton onClick={()=>{setValue({...formData, [name]:null})}}/>
            </div>
            :
            <div className="flex gap-x-2">
        <label htmlFor="filePicker" className="text-[#761BE4] underline underline-offset-4">Upload a file </label>
        <p> or drag and drop here</p>
        </div>}
    <input {...props} id="filePicker" className="hidden" type="file" accept={props.accept} onChange={onFileChange}/>
</div>
{errors[name]&&<Error error={errors[name]}/>}
</>
}