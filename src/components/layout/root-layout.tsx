import { Outlet } from 'react-router-dom';

import Navbar from './navbar';
import Sidebar from './sidebar';

export const RootLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar categories={[]} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
