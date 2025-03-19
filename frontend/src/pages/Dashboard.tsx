import { Plus, Share2 } from "lucide-react";
import { Button } from "../components/Button";
import ContentModal from "../components/ContentModal";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import Card from "../components/Card";
const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, fetchData } = useContent();
  useEffect(() => {
    fetchData();
  }, [modalOpen]);
  if (!contents) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Sidebar />
      <ContentModal open={modalOpen} onClose={() => { setModalOpen(false) }} />
      <main className="flex-1 p-8 ml-64 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">All Notes</h1>
          <div className="flex gap-2">
            <Button variant="secondary" fullWidth={false} text="Share content" startIcon={<Share2 size={18} />}></Button>
            <Button variant="primary" fullWidth={false} text="Add content" startIcon={<Plus size={20} />} onClick={() => setModalOpen(true)}></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            contents.map((content,index) =>
              <Card title={content.title} link={content.link} type={content.type} key={index}/>
            )
          }
        </div>
      </main>
    </div>
  )
}

export default Dashboard;