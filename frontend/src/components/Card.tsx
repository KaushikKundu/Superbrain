import { Tweet } from 'react-tweet';
import YouTube, { YouTubeProps } from 'react-youtube';
import { ExternalLink, Trash2 } from 'lucide-react';
// @ts-ignore: no type declarations for 'react-tiny-link'
import { ReactTinyLink } from 'react-tiny-link';

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "blog";
    id: string;
    onDelete: (id: string) => void;
    key: number;
}

const Card = ({ title, link, type, id, onDelete }: CardProps) => {
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

    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 max-h-[300px]">
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

            <div className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 aspect-video my-2">
                {type === "twitter" && <Tweet id={getTweetId(link)} />}
                {type === "youtube" && (
                    <div
                        onClick={handleClick}
                    >
                        <YouTube videoId={getYouTubeVideoId(link)} opts={options} id="video" />
                    </div>
                )}
                {
                    type === "blog" && <div className="rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 bg-white">
                        <ReactTinyLink
                            cardSize="medium"
                            showGraphic={true}
                            maxLine={2}
                            minLine={1}
                            url={link}
                        />
                    </div>
                }
            </div>

        </div>
    );
}

export default Card;