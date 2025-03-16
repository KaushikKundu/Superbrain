import { ReactElement } from "react"
import "../index.css"

interface ButtonProps {
    variant: "primary" | "secondary"
    className?: string
    text?:string 
    startIcon?:ReactElement
    onClick?: () => void
}
const variantClasses = {
    primary: "bg-purple-600 text-white",
    secondary: "bg-purple-200 text-purple-600",
}
const defaultStyles = "flex px-4 py-2 rounded-md font-semibold items-center cursor-pointer"

export function Button({variant,text,startIcon}:ButtonProps){
    return (
        <button className={variantClasses[variant]+ " " + defaultStyles}>
            <div className="pr-1">
            {startIcon}
            </div>
            {text}
        </button>
    )
}