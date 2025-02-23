interface TabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    tabs: string[];
  }
  
  const ThemeTabs = ({ activeTab, onTabChange, tabs }: TabsProps) => {
    return (
      <div className="flex border-b">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-2 capitalize ${
              activeTab === tab 
                ? 'bg-[#F5B127] text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default ThemeTabs;