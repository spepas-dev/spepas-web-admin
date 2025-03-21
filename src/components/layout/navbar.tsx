import { Search, Bell, Mail} from 'lucide-react';
import Logo from "@/assets/logo.svg?react"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b flex justify-between items-center p-4">
      <div className="text-xl font-bold text-[#4A36EC] flex items-center gap-2"><Logo className="w-8 h-8" /> SpePas</div>
      <div className="flex space-x-4">
        <Bell className="text-[#4A36EC]" />
        <Mail className="text-[#4A36EC]" />
        <Search className="text-[#4A36EC]" />
      </div>
    </nav>
  );
};

export default Navbar;
