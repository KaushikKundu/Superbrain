import Input from "../components/Input";
import { Button } from "../components/Button";
const Signin = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-slate-300">

        <div className="flex flex-col rounded-md p-3 justify-center items-center bg-white min-w-48">
            <Input placeholder="Username" />
            <Input placeholder="Password" />
            <Button text="Sign In" variant="primary" fullWidth={true} />
        </div>
        </div>
    );
}
 
export default Signin;