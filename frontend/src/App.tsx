
//import Sidebar from './components/Sidebar.jsx'
import { Twitter, Video, FileText, Link2, Hash, Share2, Trash2, Plus, Brain } from "lucide-react"
import { Button } from './components/Button'
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
    const notes: Note[] = [
      {
        title: "Future Projects",
        content: ["Build a personal knowledge base", "Create a habit tracker", "Design a minimalist todo app"],
        tags: ["productivity", "ideas"],
        date: "Added on 10/03/2024",
        type: "list",
      },
      {
        title: "How to Build a Second Brain",
        image: "/placeholder.svg?height=200&width=400",
        tags: ["productivity", "learning"],
        date: "Added on 09/03/2024",
        type: "image",
      },
      {
        title: "Productivity Tip",
        content: [
          "The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.",
        ],
        tags: ["productivity", "learning"],
        date: "Added on 08/03/2024",
        type: "text",
      },
    ]
  
    return (
      <div className="flex h-screen bg-white">
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">All Notes</h1>
            <div className="flex gap-2">
              <Button variant="secondary" text="Share content" startIcon={<Share2/>}></Button>
              <Button variant="primary" text="Add content" startIcon={<Plus/>}></Button>
            </div>
          </div>
  
          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note, index) => (
              <div key={index} className="border rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{note.title}</h3>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
  
                {note.type === "list" && note.content && (
                  <ul className="list-disc pl-4 space-y-2">
                    {note.content.map((item, i) => (
                      <li key={i} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
  
                {note.type === "image" && note.image && (
                  <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                   
                  </div>
                )}
  
                {note.type === "text" && note.content && <p className="text-gray-600">{note.content[0]}</p>}
  
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, i) => (
                      <span key={i} className="text-indigo-600 text-sm bg-indigo-50 px-2 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{note.date}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }
  
  