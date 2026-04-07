import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../API/api'
import { useEffect } from 'react'

const InfiniteScroll = () => {


    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => {
            // console.log(lastPage, allPages)

            return lastPage.length === 10 ? allPages.length + 1 : undefined
        }
    })


    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
            if (bottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, fetchNextPage]);

    // console.log(data)
    return (
        <section className="max-w-3xl mx-auto animate-in fade-in duration-700">
            <header className="mb-12">
                <h1 className="text-xl font-medium text-white tracking-tight">Infinite Scroll</h1>
                <p className="text-xs text-gray-600 uppercase tracking-widest mt-1">Powered by GitHub API (Subject to Rate Limiting)</p>
            </header>

            <div className="space-y-px bg-gray-900 border-y border-gray-900">
                {data?.pages?.map((page, index) => (
                    <div key={index} className="divide-y divide-gray-900 bg-[#0a0a0a]">
                        {page.map((user) => (
                            <div
                                key={user.id}
                                className="group flex items-center gap-4 py-4 px-3 transition-colors hover:bg-white/[0.02]"
                            >
                                {/* Avatar */}
                                <div className="relative">
                                    <img
                                        src={user.avatar_url}
                                        alt={user.login}
                                        className="h-10 w-10 rounded-full border border-gray-800 group-hover:border-indigo-500 transition-colors grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"></div>
                                </div>

                                {/* User Info */}
                                <div className="flex-grow">
                                    <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                        {user.login}
                                    </p>
                                    <p className="text-[10px] font-mono text-gray-600 uppercase tracking-tight">
                                        User Node: {user.id}
                                    </p>
                                </div>

                                {/* Minimal Profile Link */}
                                {/* <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-widest text-indigo-500 hover:text-indigo-400"
                                >
                                    Profile ↗
                                </a> */}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Loading Indicator for Next Page */}
            {/* {isFetchingNextPage && (
                <div className="flex justify-center py-10">
                    <div className="flex gap-1">
                        <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></span>
                        <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    </div>
                </div>
            )} */}

            {/* Intersection Observer Trigger */}
            {/* <div ref={ref} className="h-10" /> */}
        </section>
    );
}

export default InfiniteScroll