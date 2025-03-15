//import Sidebar from './components/Sidebar.jsx'
import { Twitter, Video, FileText, Link2, Hash, Share2, Trash2, Plus, Brain } from "lucide-react"
import { Button } from './components/Button'
import Card from "./components/Card"
import Sidebar from "./components/Sidebar"
import "./index.css"
interface Note {
  title: string
  content?: string[]
  image?: string
  tags: string[]
  date: string
  type: "list" | "image" | "text"
}

export default function App() {

  return (
    <div>
      <Sidebar/>
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">All Notes</h1>
          <div className="flex gap-2">
            <Button variant="secondary" text="Share content" startIcon={<Share2 size={18}/>}></Button>
            <Button variant="primary" text="Add content" startIcon={<Plus size={20} />}></Button>
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

