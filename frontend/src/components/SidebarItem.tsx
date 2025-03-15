interface SidebarItemProps {
    logo: React.ReactElement;
    text: string;
}
const SidebarItem = ({logo,text}:SidebarItemProps) => {
    return (
        <div className="flex items-center gap-4 cursor-pointer hover:bg-purple-500 p-2 rounded-md ">
            <div>
                {logo}
            </div>
            <h1 className="text-lg font-semibold">
                {text}
            </h1>
        </div>
      );
}
 
export default SidebarItem;