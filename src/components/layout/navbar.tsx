import { ShoppingCart, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b flex justify-between items-center p-4">
      <div className="text-xl font-bold text-[#4A36EC]">AutoParts Store</div>
      <div className="flex space-x-4">
        <ShoppingCart className="text-[#4A36EC]" />
        <Search className="text-[#4A36EC]" />
      </div>
    </nav>
  );
};

export default Navbar;
