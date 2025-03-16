import { Brain } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { BirdIcon, VideoIcon, File, Link} from "lucide-react";
const Sidebar = () => {
    return ( 
        <aside className="w-64 h-screen fixed top-0 left-0 p-4 shadow-lg ">
            <div className="flex items-center gap-2 cursor-pointer">
                <span><Brain size={36}/></span>
                <h1 className="text-2xl font-bold">SuperBrain</h1>
            </div>
            <div className="flex flex-col gap-6  mt-10">
                <SidebarItem logo={<BirdIcon size={24}/>} text="Tweets"/>
                <SidebarItem logo={<VideoIcon size={24}/>} text="Videos"/>
                <SidebarItem logo={<File size={24}/>} text="Documents"/>
                <SidebarItem logo={<Link size={24}/>} text="Links"/>
            </div>
        </aside>
     );
}
 
export default Sidebar;