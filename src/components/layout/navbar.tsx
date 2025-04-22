import { Bell, LogOut, Mail, Search, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/logo.svg?react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/stores';

const Navbar = () => {
  const navigate = useNavigate();
  const { actions, isAuthenticated, user } = useStore((state) => state);

  const handleLogout = async () => {
    await actions.logout(navigate);
  };

  // Get initials from user's name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="bg-white border-b flex justify-between items-center p-4">
      <div className="text-xl font-bold text-[#4A36EC] flex items-center gap-2">
        <Logo className="w-8 h-8" /> SpePas
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="text-[#4A36EC] cursor-pointer" />
        <Mail className="text-[#4A36EC] cursor-pointer" />
        <Search className="text-[#4A36EC] cursor-pointer" />

        {isAuthenticated && user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80">
                <AvatarImage src={user?.photo} />
                <AvatarFallback className="bg-[#4A36EC] text-white">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
