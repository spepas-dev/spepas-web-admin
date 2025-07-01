import { Outlet } from 'react-router-dom';

import Navbar from './navbar';
import Sidebar from './sidebar';

export const RootLayout = () => {
  return (
    <div className="mx-auto flex h-screen">
      <Sidebar categories={[]} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
