import { Home, Settings, User, LogOut, Brain } from "lucide-react";
import SidebarItem from "./SidebarItem";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async() => {
    const res = await axios.post(`${BACKEND_URL}api/v1/logout`, {
      withCredentials: true,
    });
    if(res.status === 200){
      navigate('/signin');
    }
  }
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-950 text-white p-5 flex flex-col justify-between shadow-2xl">
      <div>
        <div className="mb-8 mt-4 flex items-center gap-2">
            <Brain className="w-8 h-8 text-white"/>
          <h1 className="text-2xl tracking-wide">SuperBrain</h1>
        </div>

        <div className="space-y-2">
          <SidebarItem logo={<Home />} text="Dashboard" />
          <SidebarItem logo={<User />} text="Profile" />
          <SidebarItem logo={<Settings />} text="Settings" />
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4" onClick={()=>handleLogout()}>
        <SidebarItem logo={<LogOut />} text="Logout" />
      </div>
    </aside>
  );
};

export default Sidebar;