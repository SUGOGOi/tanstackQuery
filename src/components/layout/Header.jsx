import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const links = [
    { to: "/", label: "Home" },
    { to: "/trad", label: "Traditional" },
    { to: "/rq", label: "TanstackQuery" },
    { to: "/infinite", label: "Infinite Scroll" },
];

export const Header = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const activeClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive ? "text-indigo-400" : "text-gray-400 hover:text-white"}`;

    return (
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <NavLink to="/" className="font-bold tracking-tighter text-white hover:opacity-80">
                    SUMSUM<span className="text-indigo-500">RQ</span>
                </NavLink>

                {/* Desktop nav */}
                <nav className="hidden md:block">
                    <ul className="flex gap-8">
                        {links.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink to={to} className={activeClass} end={to === "/"}>
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile: hamburger + dropdown */}
                <div className="relative md:hidden" ref={menuRef}>
                    <button
                        onClick={() => setOpen(prev => !prev)}
                        className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-5 h-px bg-gray-400 transition-all duration-250 group-hover:bg-white ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                        <span className={`block w-5 h-px bg-gray-400 transition-all duration-250 group-hover:bg-white ${open ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-px bg-gray-400 transition-all duration-250 group-hover:bg-white ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
                    </button>

                    {/* Dropdown */}
                    <div className={`absolute right-0 top-[calc(100%+8px)] w-44 bg-[#111] border border-gray-800 rounded-xl p-1.5 transition-all duration-200 origin-top-right ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}>
                        {links.map(({ to, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `block px-3 py-2 text-sm rounded-lg transition-colors ${isActive ? "text-indigo-400" : "text-gray-400 hover:text-white hover:bg-white/5"}`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};