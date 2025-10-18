import { Tweet } from 'react-tweet';
import YouTube, { YouTubeProps } from 'react-youtube';
import { ExternalLink, Edit3, Trash2 } from 'lucide-react';

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "blog";
    id: string;
    onDelete: (id:string) => void;
}
const Card = ({ title, link, type, id ,onDelete}:CardProps) => {
    const getTweetId = (link: string) => {
        const match = link.match(/status\/(\d+)/);
        return match ? match[1] : "";
    }
    const options: YouTubeProps['opts'] = {
        width: "100%",
        height: "100%",
    };
    function getYouTubeVideoId(url: string) {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/.*v=)([^&?/]+)/);
        return match ? match[1] : "";
    }

    const videoId = getYouTubeVideoId(link);
    const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        window.open(watchUrl, '_blank', "noopener,noreferrer");
    }

    
    const styles = "size-full cursor-pointer my-2";
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900 leading-tight">{title}</h3>
                <div className="flex gap-2">
                    <button className="p-1.5 rounded-md cursor-pointer hover:bg-gray-100 transition">
                        <ExternalLink size={18} className="text-gray-600" />
                    </button>
                    <button className="p-1.5 rounded-md cursor-pointer hover:bg-red-50 transition" onClick={() => onDelete(id)}>
                        <Trash2 size={18} className="text-red-500" />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                {type === "twitter" && (
                    <div className={styles}>
                        <Tweet id={getTweetId(link)} />
                    </div>
                )}
                {type === "youtube" && (
                    <div
                        onClick={handleClick}
                        className={`${styles} cursor-pointer transition-transform duration-200 hover:scale-[1.01]`}
                    >
                        <YouTube videoId={getYouTubeVideoId(link)} opts={options} id="video" />
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                    <span className="text-indigo-600 text-xs font-medium bg-indigo-50 px-2 py-1 rounded-full">
                        #learning
                    </span>
                    <span className="text-pink-600 text-xs font-medium bg-pink-50 px-2 py-1 rounded-full">
                        #youtube
                    </span>
                </div>
                {/* <p className="text-sm text-gray-600 leading-relaxed">{description}</p> */}
            </div>
        </div>
    );
}

export default Card;