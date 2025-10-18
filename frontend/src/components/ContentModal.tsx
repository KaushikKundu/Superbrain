import Input from "./Input";
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
    TWITTER = "twitter",
    BLOG = "blog"
}
const ContentModal = ({ open, onClose }: ContentModalProps) => {
    if (!open) return null;
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.YOUTUBE);

    const handleSubmit = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(BACKEND_URL + "api/v1/content", {
            title,
            link,
            type
        }, {
            withCredentials: true
        })
        onClose();
    }
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                <form
                    onSubmit={handleSubmit}
                    className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Enter Content Details
                        </h1>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-1 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                        >
                            <CircleX size={22} />
                        </button>
                    </div>

                    <div className="space-y-4 mb-4">
                        <Input placeholder="Enter content title" reference={titleRef} />
                        <Input placeholder="Enter content link" reference={linkRef} />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content Type
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as ContentType)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
                        >
                            <option value={ContentType.YOUTUBE}>YouTube</option>
                            <option value={ContentType.TWITTER}>Twitter</option>
                            <option value={ContentType.BLOG}>Blog</option>
                        </select>
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-medium px-5 py-2.5 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default ContentModal;

