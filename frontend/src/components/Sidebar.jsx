const Sidebar = () => {
    return ( 
        <aside className="w-64 border-r p-4 space-y-4">
        <div className="flex items-center gap-2 mb-8">
          <Brain className="w-6 h-6 text-indigo-600" />
          <span className="font-semibold">Second Brain</span>
        </div>

        <nav className="space-y-2">
          <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg text-gray-700">
            <Twitter className="w-5 h-5" />
            <span>Tweets</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg text-gray-700">
            <Video className="w-5 h-5" />
            <span>Videos</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg text-gray-700">
            <FileText className="w-5 h-5" />
            <span>Documents</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg text-gray-700">
            <Link2 className="w-5 h-5" />
            <span>Links</span>
          </button>
          <button className="flex items-center gap-3 w-full p-2 hover:bg-gray-100 rounded-lg text-gray-700">
            <Hash className="w-5 h-5" />
            <span>Tags</span>
          </button>
        </nav>
      </aside>
     );
}
 
export default Sidebar;

