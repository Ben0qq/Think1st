import { ReactSVG } from "react-svg"
import errorIcon from "../public/errorIcon.svg"

export const Error = ({error}:{error:string}) =>{
    return <div className="flex flex-row gap-1">
        <ReactSVG src={errorIcon}/>
        <p className="text-sm">{error}</p>
    </div>
}