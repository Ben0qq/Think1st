import { useState } from "react"
import Calendar from "./Calendar"
import { FileUploader } from "./FileUploader"
import { Input } from "./Input"
import { Radio } from "./Radio"
import { Slider } from "./Slider"
import type { FormData, FormError } from "./types"
import { deafultFormError } from "./utils"

export const Form = () =>{
    const [formData, setFormData] = useState<FormData>({
        firstName:"",
        lastName:"",
        email:"",
        age:8,
        photo:null,
        day:{valid:false},
        hour:""
    })

    const [formError, setFormError] = useState<FormError>(deafultFormError)

    const setData = (formData:FormData)=>{
        setFormError(deafultFormError);
        setFormData(formData)
    }

    const sendApplication = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch('http://letsworkout.pl/submit', requestOptions)
    }

    const validate = () =>{
        if(!formData.firstName) setFormError(prev=>({...prev,firstName:"This field is required"}))
        else if(!formData.lastName) setFormError(prev=>({...prev,lastName:"This field is required"}))
        else if(!formData.email) setFormError(prev=>({...prev,email:"This field is required"}))
        else if(!/\S+@\S+\.\S+/.test(formData.email)) setFormError(prev=>({...prev,email:`Please use correct formatting. Example: address@email.com`}))
        else if(!formData.photo) setFormError(prev=>({...prev,photo:"This field is required"}))
        else if(!formData.day || !formData.hour) setFormError(prev=>({...prev,day:"This fields are required"}))
        else sendApplication()
    }

    return <form className="gap-y-6 flex flex-col">
        <Input label="First Name" name="firstName" formData={formData} setValue={setData} errors={formError}/>
        <Input label="Last Name" name="lastName" formData={formData} setValue={setData} errors={formError}/>
        <Input label="Email Address" name="email" formData={formData} setValue={setData} errors={formError}/>
        <Slider label="Age" name="age" formData={formData} setValue={setData}/>
        {/* podstawowe formaty obrazów */}
        <FileUploader label="Photo" accept="image/png, image/gif, image/jpeg" name="photo" formData={formData} setValue={setData} errors={formError}/> 
        <div className="flex flex-col sm:flex-row gap-4">
        <Calendar label="Date" name="day" formData={formData} setValue={setData} errors={formError}/>
        {formData.day.valid===true&&<Radio values={["12:00", "14:00", "16:30", "18:30", "20:00"]} label="Time" name="hour" formData={formData} setValue={setData}/>}
        </div>
        <button onClick={(e)=>{e.preventDefault();validate();}} className="text-white py-4 px-8 bg-[#761BE4] disabled:bg-[#CBB6E5] hover:bg-[#6A19CD]">Send Application</button>
    </form>
}