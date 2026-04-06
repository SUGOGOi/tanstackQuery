import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div className="max-w-3xl mx-auto py-10 animate-in fade-in duration-1000">
            {/* Hero Section */}
            <header className="mb-16">
                <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
                    React Data <span className="text-indigo-500">Patterns.</span>
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                    A technical showcase comparing different architectural approaches to
                    data fetching and state synchronization in modern React applications.
                </p>

                <div className="mt-8 flex gap-4">
                    <a
                        href="https://github.com/your-username/your-repo-name"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-md hover:bg-gray-200 transition-colors"
                    >
                        View on GitHub
                    </a>
                </div>
            </header>

            {/* Feature Grid */}
            <div className="space-y-12">
                <section>
                    <h2 className="text-xs uppercase tracking-[0.2em] text-indigo-500 font-bold mb-6">The Methodology</h2>
                    <div className="grid gap-8">

                        {/* Feature 1 */}
                        <div className="group">
                            <h3 className="text-white font-medium mb-2 group-hover:text-indigo-400 transition-colors">
                                01. Traditional State Management
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Demonstrating the classic approach using <code className="text-gray-300">useEffect</code> and <code className="text-gray-300">useState</code>.
                                This section highlights manual loading states, error handling, and the imperative nature of standard fetch calls.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group">
                            <h3 className="text-white font-medium mb-2 group-hover:text-indigo-400 transition-colors">
                                02. TanStack Query (v5)
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Shifting to declarative data fetching. This implementation showcases auto-caching,
                                background refetching, and a significantly reduced boilerplate for a more robust developer experience.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group">
                            <h3 className="text-white font-medium mb-2 group-hover:text-indigo-400 transition-colors">
                                03. Infinite Scroll
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                A specialized implementation using <code className="text-gray-300">useInfiniteQuery</code>.
                                Features seamless pagination and "load-on-scroll" logic designed for high-performance data lists.
                            </p>
                        </div>

                    </div>
                </section>
            </div>

            {/* Subtle Tech Stack Footer */}
            <div className="mt-20 pt-8 border-t border-gray-900 flex gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                <span className="text-[10px] font-mono tracking-tighter">REACT 19</span>
                <span className="text-[10px] font-mono tracking-tighter">TANSTACK QUERY</span>
                <span className="text-[10px] font-mono tracking-tighter">TAILWIND CSS</span>
                <span className="text-[10px] font-mono tracking-tighter">AXIOS</span>
            </div>
        </div>
    );
};

export default Home;