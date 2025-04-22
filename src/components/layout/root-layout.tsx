import { Outlet } from 'react-router-dom';

import Navbar from './navbar';
import Sidebar from './sidebar';

export const RootLayout = () => {
  return (
    <div className="flex">
      <Sidebar categories={[]} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <div className="p-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
