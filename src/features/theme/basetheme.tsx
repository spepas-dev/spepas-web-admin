import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Car, 
  Wrench, 
  GlassWater, 
  Battery,
  LucideIcon
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import Logo from '@/assets/logo.svg';

interface MenuItem {
    id: string;
    name: string;
    icon?: LucideIcon;
    path?: string;
    children?: MenuItem[];
    count?: number;
    permissions?: string;
}

interface MenuGroup {
    id: string;
    title: string;
    items: MenuItem[];
}

const BaseTheme = () => {
  const [activeTab, setActiveTab] = useState('parts');
  const [selectedProduct, setSelectedProduct] = useState(null);
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
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const menuGroups: MenuGroup[] = [
    {
      id: 'vehicles',
      title: 'Vehicle Categories',
      items: [
        {
          id: 'passenger',
          name: 'Passenger Vehicles',
          icon: Car,
          path: '/vehicles/passenger',
          children: [
            {
              id: 'sedans',
              name: 'Sedans',
              path: '/vehicles/passenger/sedans',
              count: 124,
              children: [
                { 
                  id: 'compact', 
                  name: 'Compact Sedans', 
                  path: '/vehicles/passenger/sedans/compact',
                  count: 45, 
                  
                },
                { 
                  id: 'midsize', 
                  name: 'Midsize Sedans', 
                  path: '/vehicles/passenger/sedans/midsize',
                  count: 42 
                },
                { 
                  id: 'luxury', 
                  name: 'Luxury Sedans', 
                  path: '/vehicles/passenger/sedans/luxury',
                  count: 37,
                  permissions: 'premium',
                  children: [
                    {
                      id: 'sedan',
                      name: 'Sedan',
                      path: '/vehicles/passenger/sedans/luxury/sedan',
                    }
                  ]
                }
              ]
            },
            {
              id: 'suvs',
              name: 'SUVs',
              path: '/vehicles/passenger/suvs',
              count: 87,
              children: [
                { 
                  id: 'compact-suv', 
                  name: 'Compact SUVs', 
                  path: '/vehicles/passenger/suvs/compact',
                  count: 28 
                },
                { 
                  id: 'midsize-suv', 
                  name: 'Midsize SUVs', 
                  path: '/vehicles/passenger/suvs/midsize',
                  count: 34 
                },
                { 
                  id: 'full-suv', 
                  name: 'Full-size SUVs', 
                  path: '/vehicles/passenger/suvs/full',
                  count: 25,
                  permissions: 'premium' 
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'parts',
      title: 'Parts & Components',
      items: [
        {
          id: 'engine',
          name: 'Engine Components',
          icon: Wrench,
          path: '/parts/engine',
          children: [
            {
              id: 'filters',
              name: 'Filters',
              path: '/parts/engine/filters',
              count: 45,
              children: [
                { 
                  id: 'air-filters', 
                  name: 'Air Filters', 
                  path: '/parts/engine/filters/air',
                  count: 18 
                },
                { 
                  id: 'oil-filters', 
                  name: 'Oil Filters', 
                  path: '/parts/engine/filters/oil',
                  count: 15 
                },
                { 
                  id: 'fuel-filters', 
                  name: 'Fuel Filters', 
                  path: '/parts/engine/filters/fuel',
                  count: 12,
                  permissions: 'dealer' 
                }
              ]
            },
            {
              id: 'fluids',
              name: 'Fluids & Chemicals',
              icon: GlassWater,
              path: '/parts/fluids',
              children: [
                { 
                  id: 'oils', 
                  name: 'Motor Oils', 
                  path: '/parts/fluids/oils',
                  count: 67 
                },
                { 
                  id: 'transmission', 
                  name: 'Transmission Fluid', 
                  path: '/parts/fluids/transmission',
                  count: 22 
                },
                { 
                  id: 'coolant', 
                  name: 'Coolant', 
                  path: '/parts/fluids/coolant',
                  count: 18 
                }
              ]
            },
            {
              id: 'electrical',
              name: 'Electrical Systems',
              icon: Battery,
              path: '/parts/electrical',
              children: [
                { 
                  id: 'batteries', 
                  name: 'Batteries & Power', 
                  path: '/parts/electrical/batteries',
                  count: 54 
                },
                { 
                  id: 'alternators', 
                  name: 'Alternators', 
                  path: '/parts/electrical/alternators',
                  count: 29,
                  permissions: 'dealer' 
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  const products = [
    { id: 1, name: 'Brake Pads', price: 49.99, category: 'brakes' },
    { id: 2, name: 'Oil Filter', price: 12.99, category: 'engine' },
    { id: 3, name: 'Air Filter', price: 24.99, category: 'engine' }
  ];

  return (
    <div className="flex font-roboto">
      {/* Sidebar */}
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
        <div className='flex items-center justify-center'>
          <img src={Logo} alt="Logo" className='w-10 h-10' />
          <h2 className='text-2xl font-bold'>Spepas</h2>
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

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Navigation */}
        <nav className="bg-white border-b flex justify-between items-center p-4">
          <div className="text-xl font-bold text-[#4A36EC]">AutoParts Store</div>
          <div className="flex space-x-4">
            <ShoppingCart className="text-[#4A36EC]" />
            <Search className="text-[#4A36EC]" />
          </div>
        </nav>

        {/* Tabs */}
        <div className="flex border-b">
          {['parts', 'accessories', 'tools'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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

        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-4 p-4">
          {products.map(product => (
            <div 
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all 
                ${selectedProduct?.id === product.id 
                  ? 'border-[#F5B127] shadow-lg' 
                  : 'hover:border-[#4A36EC]'}
              `}
            >
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-[#4A36EC] font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaseTheme;