import { ReactElement } from "react"
import "../index.css"

interface ButtonProps {
    variant: "primary" | "secondary"
    className?: string
    text?:string 
    startIcon?:ReactElement
    onClick?: () => void
    fullWidth?:boolean
    loading?:boolean
}
const variantClasses = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-200 text-purple-600",
}
const defaultStyles = "flex px-4 py-2 rounded-md font-semibold items-center cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out justify-center "

export function Button({variant,text,startIcon,onClick,fullWidth,loading}:ButtonProps){
    return (
        <button onClick={onClick} className={variantClasses[variant]+ " " + defaultStyles + `${fullWidth ? "w-full ":""}` + `${loading ? " opacity-50 ":""}`} disabled={loading}>
            <div className="pr-1">
            {startIcon}
            </div>
            {text}
        </button>
    )
}