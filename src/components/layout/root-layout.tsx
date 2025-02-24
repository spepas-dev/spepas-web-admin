import ThemeTabs from "./theme-tab";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <div className="flex">
            <Sidebar categories={[]} />
            <div className="flex-1">
                <Navbar />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}