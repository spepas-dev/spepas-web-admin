import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  ChevronDown, 
  ChevronRight,
  Car, 
  Wrench, 
  GlassWater, 
  Battery 
} from 'lucide-react';

const AutoPartsApp = () => {
  const [activeTab, setActiveTab] = useState('parts');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openCategories, setOpenCategories] = useState({});

  const sidebarCategories = [
    { 
      name: 'Vehicles', 
      icon: Car,
      subcategories: [
        { name: 'Sedans', count: 124 },
        { name: 'SUVs', count: 87 },
        { name: 'Trucks', count: 56 }
      ]
    },
    { 
      name: 'Engine Parts', 
      icon: Wrench,
      subcategories: [
        { name: 'Filters', count: 45 },
        { name: 'Belts', count: 32 },
        { name: 'Gaskets', count: 28 }
      ]
    },
    { 
      name: 'Fluids', 
      icon: GlassWater,
      subcategories: [
        { name: 'Motor Oil', count: 67 },
        { name: 'Transmission Fluid', count: 22 },
        { name: 'Coolant', count: 18 }
      ]
    },
    { 
      name: 'Electrical', 
      icon: Battery,
      subcategories: [
        { name: 'Batteries', count: 54 },
        { name: 'Alternators', count: 29 },
        { name: 'Starters', count: 37 }
      ]
    }
  ];

  const toggleCategory = (categoryName) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

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

        <nav className="mt-4">
          {sidebarCategories.map((category) => (
            <div key={category.name}>
              <div 
                onClick={() => toggleCategory(category.name)}
                className={`
                  flex items-center 
                  p-4 
                  hover:bg-[#F5B127] 
                  cursor-pointer
                  ${isSidebarOpen ? 'justify-between' : 'justify-center'}
                `}
              >
                <div className="flex items-center">
                  <category.icon className={isSidebarOpen ? 'mr-4' : ''} />
                  {isSidebarOpen && <span>{category.name}</span>}
                </div>
                {isSidebarOpen && (
                  <ChevronDown 
                    className={`
                      transform transition-transform 
                      ${openCategories[category.name] ? 'rotate-180' : ''}
                    `} 
                    size={20} 
                  />
                )}
              </div>

              {isSidebarOpen && openCategories[category.name] && (
                <div className="pl-4 bg-[#4336D3]">
                  {category.subcategories.map((sub) => (
                    <div 
                      key={sub.name} 
                      className="
                        flex justify-between 
                        p-2 
                        hover:bg-[#F5B127] 
                        cursor-pointer
                      "
                    >
                      <span>{sub.name}</span>
                      <span className="text-sm opacity-75">({sub.count})</span>
                    </div>
                  ))}
                </div>
              )}
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

export default AutoPartsApp;