import Input from "../components/Input";
import { Button } from "../components/Button";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const handleSignup = async () => {
        const username = usernameRef.current?.value;
        console.log(usernameRef.current)
        const password = passwordRef.current?.value;
        await axios.post(BACKEND_URL + "api/v1/signup", {
            
                username,
                password
            
        })
        navigate("/signin");
    }
    return (
        <div className="flex justify-center items-center h-screen bg-slate-300">

        <div className="flex flex-col rounded-md p-3 justify-center items-center bg-white min-w-48">
            <Input placeholder="Username" reference={usernameRef}/>
            <Input placeholder="Password" reference={passwordRef} />
            <Button text="Sign Up" variant="primary" fullWidth={true} onClick={handleSignup}/>
        </div>
        </div>
    );
}
 
export default Signup;