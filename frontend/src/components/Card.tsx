import { Share2, Trash2 } from 'lucide-react';
import { Tweet } from 'react-tweet';
import YouTube, { YouTubeProps } from 'react-youtube';

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube"
}
const Card = ({ title, link, type }: CardProps) => {
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
    const styles = "w-full h-full cursor-pointer ";
    return (
        <div className="bg-white rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-start">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <div className="flex gap-2">
                   
                </div>
            </div>
            <div>
                {
                    type === "twitter" &&
                    <div className={styles}>
                        <Tweet id={getTweetId(link)}></Tweet>
                    </div>
                }
                {
                    type === "youtube" && <div onClick={handleClick} className={styles} >
                        <YouTube videoId={getYouTubeVideoId(link)} opts={options} id='video' />
                    </div>
                }

            </div>

            <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                    <span className="text-indigo-600 text-sm bg-indigo-50 px-2 py-1 rounded-md">

                    </span>
                </div>
                <p className="text-sm text-gray-500"></p>
            </div>
        </div>
    );
}

export default Card;