interface SidebarItemProps {
    logo: React.ReactElement;
    text: string;
}
const SidebarItem = ({ logo, text }: SidebarItemProps) => {
  return (
    <div className="flex items-center gap-4 cursor-pointer group transition-all duration-200 hover:bg-teal-600 p-3 rounded-lg hover:scale-[1.02]">
      <div className="text-gray-100 group-hover:text-white transition-colors duration-200">
        {logo}
      </div>
      <h1 className="text-base font-medium group-hover:text-white">
        {text}
      </h1>
    </div>
  );
};
 
export default SidebarItem;