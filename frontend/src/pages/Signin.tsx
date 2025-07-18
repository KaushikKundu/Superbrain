import Input from "../components/Input";
import { Button } from "../components/Button";
import {  useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { login } = useAuth();
    async function handleSignin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const res = await axios.post(BACKEND_URL + "api/v1/signin", {
            username,
            password
        })
        const jwt = res.data.token;
        login(jwt);
        navigate("/dashboard");
    }
    return (
        <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className="flex flex-col rounded-md p-3 justify-center items-center bg-white min-w-48">
            <Input placeholder="Username" reference={usernameRef}/>
            <Input placeholder="Password" reference={passwordRef} />
            <Button text="Sign In" variant="primary" fullWidth={true} onClick={handleSignin}/>
        </div>
        </div>
    );
}
 
export default Signin;