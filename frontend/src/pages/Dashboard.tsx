import { Plus, Share2 } from "lucide-react";
import ContentModal from "../components/ContentModal";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import Card from "../components/Card";


const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, fetchData,handleDelete } = useContent();

  useEffect(() => {
    fetchData();
  }, [modalOpen]);

  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>
      <ContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
      <main className="flex-1 p-8 bg-slate-200">
        <div className="flex justify-between items-center mb-8">
          <p className="text-3xl font-medium sm:text-2xl">Welcome Back, Kaushik</p>
          <div className="flex gap-2">
            <button className="flex items-center cursor-pointer gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200">
              <Share2 className="w-4 h-4"/>
              Share
            </button>
            <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-400 text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <Plus className="w-4 h-4"/>
              New
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            contents && contents.map((content,index) =>
              <Card title={content.title} link={content.link} type={content.type} key={index} id={content.id} onDelete={handleDelete} />
            )
          }

        </div>
      </main>
    </div>
  )
}

export default Dashboard;