import { NavLink } from "react-router-dom";

export const Header = () => {
    const activeClass = ({ isActive }) =>
        `text-sm font-medium transition-colors ${isActive ? "text-indigo-400" : "text-gray-400 hover:text-white"}`;

    return (
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <NavLink to="/" className="font-bold tracking-tighter text-white hover:opacity-80">
                    SUMSUM<span className="text-indigo-500">RQ</span>
                </NavLink>
                <nav>
                    <ul className="flex gap-8">
                        <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
                        <li><NavLink to="/trad" className={activeClass}>Traditional</NavLink></li>
                        <li><NavLink to="/rq" className={activeClass}>ReactQuery</NavLink></li>
                        <li><NavLink to="/infinite" className={activeClass}>Infinite Scroll</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};