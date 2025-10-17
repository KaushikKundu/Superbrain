import Input from "./Input";
import { Button } from "./Button";
import { CircleX } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
interface ContentModalProps {
    open: boolean,
    onClose: () => void;
}
enum ContentType {
    YOUTUBE = "youtube",
    TWITTER = "twitter"
}
const ContentModal = ({ open, onClose }: ContentModalProps) => {
    if (!open) return null;
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type,setType]  = useState<ContentType>(ContentType.YOUTUBE);

    const handleSubmit = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        console.log(title, link);
        await axios.post(BACKEND_URL + "api/v1/content", {
            title,
            link,
            type
        },{
            withCredentials: true
        })
        onClose();
    }
    return (
        <>
            <div className=" w-screen h-screen bg-gray-400 fixed top-0 left-0 flex justify-center items-center opacity-50">
            </div>
            <div className="flex justify-center items-center w-screen h-screen fixed z-100">
                <form action={handleSubmit} className="w-full max-w-md p-6 bg-purple-100  rounded-lg shadow-md fixed ">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800 text-center">Enter Content Details</h1>
                        <div className="cursor-pointer hover:rounded-2xl" onClick={onClose}>
                            <CircleX />
                        </div>
                    </div>

                    <div>
                        <Input placeholder="Enter content title" reference={titleRef}/>
                        <Input placeholder="Enter content link" reference={linkRef}/>
                    </div>
                    <div className="flex justify-evenly">
                        <Button text="youtube" variant="primary" onClick={() => setType(ContentType.YOUTUBE)} />
                        <Button text="twitter" variant="primary" onClick={() => setType(ContentType.TWITTER)}/>
                    </div>
                    <div className="flex justify-center w-full">
                        <Button variant="primary" text="Submit" ></Button>
                    </div>
                </form>
            </div >
        </>
    );
}

export default ContentModal;

