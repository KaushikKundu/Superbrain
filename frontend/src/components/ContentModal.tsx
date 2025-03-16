import Input from "./Input";
import { Button } from "./Button";
import {CircleX} from "lucide-react";
interface ContentModalProps {
    open: boolean,
    onClose: () => void;
}
const ContentModal = ({ open, onClose }:ContentModalProps) => {

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-400 ">
            {
                open && <div className="w-full max-w-md p-6 bg-purple-100 rounded-lg shadow-md z-50">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800 text-center">Enter Content Details</h1>
                       <div className="cursor-pointer hover:rounded-2xl" onClick={onClose}>
                         <CircleX/>
                        </div>
                    </div>

                    <div>
                        <Input placeholder="Enter content title" />
                        <Input placeholder="Enter content link" />
                    </div>
                    <div>
                        <Button text="youtube" variant="primary" />
                    </div>
                    <div className="flex justify-center w-full">

                        <Button variant="primary" text="Submit"></Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default ContentModal;

