import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-300 selection:bg-indigo-500/30">
            <Header />

            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};