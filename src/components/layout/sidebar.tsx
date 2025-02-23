import { MenuItem } from '@/types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { menuGroups } from './menu';

interface SubCategory {
  name: string;
  count: number;
}

interface Category {
  name: string;
  icon: any; // Consider using a more specific type
  subcategories: SubCategory[];
}

interface SidebarProps {
  categories: Category[];
}

const Sidebar = ({ categories }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openCategories[item.id];
    const paddingLeft = `${(level + 1) * 1}rem`;

    return (
      <div key={item.id}>
        <NavLink
          to={item.path || '#'}
          className={({ isActive }) => `
            flex items-center 
            p-4 
            cursor-pointer
            transition-colors
            ${isSidebarOpen ? 'justify-between' : 'justify-center'}
            ${level > 0 ? 'bg-opacity-50' : ''}
            ${isActive 
              ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
              : 'hover:bg-sidebar-accent text-sidebar-foreground'
            }
          `}
          style={{ paddingLeft }}
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              toggleCategory(item.id);
            }
          }}
        >
          <div className="flex items-center">
            {item.icon && (
              <item.icon 
                className={`
                  ${isSidebarOpen ? 'mr-4' : ''} 
                  ${item.path ? 'text-current' : ''}
                `} 
                size={20} 
              />
            )}
            {isSidebarOpen && (
              <div className="flex items-center justify-between flex-1">
                <span className="truncate">{item.name}</span>
                {item.count !== undefined && (
                  <span className="text-sm opacity-75 ml-2">({item.count})</span>
                )}
                {item.permissions && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-sidebar-accent">
                    {item.permissions}
                  </span>
                )}
              </div>
            )}
          </div>
          {isSidebarOpen && hasChildren && (
            <ChevronDown 
              className={`
                transform transition-transform 
                ${isOpen ? 'rotate-180' : ''}
              `} 
              size={16} 
            />
          )}
        </NavLink>

        {isSidebarOpen && isOpen && hasChildren && (
          <div 
            className="bg-sidebar-accent bg-opacity-50"
            style={{ paddingLeft: `${level * 0.5}rem` }}
          >
            {item.children && item.children.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
        className={`
          bg-[#4A36EC] 
          text-white 
          h-screen 
          overflow-y-auto
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          transition-all 
          duration-300 
          ease-in-out
        `}
      >
        <div className="sticky top-0 bg-[#4A36EC] z-10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full p-4 hover:bg-[#F5B127]"
          >
            <ChevronRight className={`mx-auto ${isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="mt-4">
          {menuGroups.map((group) => (
            <div key={group.id}>
              {isSidebarOpen && (
                <div className="px-4 py-2 text-sm font-semibold text-gray-300 uppercase">
                  {group.title}
                </div>
              )}
              {group.items.map((item) => renderMenuItem(item))}
            </div>
          ))}
        </nav>
      </div>
  );
};

export default Sidebar;