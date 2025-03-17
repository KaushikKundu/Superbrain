import { Plus, Share2 } from "lucide-react";
import { Button } from "../components/Button";
import Card from "../components/Card";
import ContentModal from "../components/ContentModal";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
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
          <Card title="tweets" type="twitter" link="https://x.com/naval/status/1900870844060156138"></Card>
          <Card title="youtube" type="youtube" link="https://youtu.be/o3IqOrXtxm8?si=7bcnBM2TVSuqGEzk"></Card>


        </div>
      </main>
    </div>
  )
}
 
export default Dashboard;