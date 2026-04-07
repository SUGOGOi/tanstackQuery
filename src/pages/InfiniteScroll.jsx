import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPostInfinite } from '../API/api';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const InfiniteScroll = () => {
    const {
        data,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error
    } = useInfiniteQuery({
        queryKey: ['infinitePosts'],
        queryFn: fetchPostInfinite,
        getNextPageParam: (lastPage, allPages) => {
            // JSONPlaceholder has 100 posts. If last page had 10, fetch next.
            return lastPage.length === 10 ? allPages.length * 10 : undefined;
        },
        retry: false,
    });

    // Handle Scroll for Pagination
    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
            if (bottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="h-1 w-20 bg-gray-900 overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-20 border border-red-900/20 bg-red-900/5 rounded-sm">
                <p className="text-sm text-red-400 font-mono">Error: {error.message}</p>
            </div>
        );
    }

    return (
        <section className="max-w-3xl mx-auto animate-in fade-in duration-700">
            <header className="mb-12">
                <h1 className="text-xl font-medium text-white tracking-tight">Infinite Feed</h1>
                <p className="text-sm text-gray-500">Continuous post stream via JSONPlaceholder (Subject to static data limits).</p>
            </header>

            <div className="divide-y divide-gray-900">
                {data?.pages?.map((page, index) => (
                    <div key={index} className="divide-y divide-gray-900">
                        {page.map((post) => (
                            <div
                                key={post.id}
                                className="group py-8 flex flex-col gap-2 transition-colors hover:bg-white/[0.01] px-4 -mx-4 rounded-md"
                            >
                                {/* Metadata Row */}
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-indigo-500/50 group-hover:text-indigo-500 transition-colors">
                                        ENTRY_{String(post.id).padStart(3, '0')}
                                    </span>
                                    <span className="h-px w-4 bg-gray-800"></span>
                                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                                        User_{post.userId}
                                    </span>
                                </div>

                                {/* Content */}
                                <h2 className="text-lg text-gray-200 group-hover:text-white transition-colors font-medium capitalize leading-snug">
                                    {post.title}
                                </h2>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed group-hover:text-gray-400 transition-colors">
                                    {post.body}
                                </p>

                                {/* Bottom Action */}
                                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                                    <NavLink to={`/rq/${post.id}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-white transition-colors">
                                        Expand Content +
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Loading Indicator */}
            {isFetchingNextPage && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="flex gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-700 uppercase tracking-[0.3em]">Loading Buffer</span>
                </div>
            )}

            {!hasNextPage && (
                <div className="py-20 text-center">
                    <p className="text-[10px] text-gray-800 uppercase tracking-[0.4em] font-bold">
                        End of Stream
                    </p>
                </div>
            )}
        </section>
    );
};

export default InfiniteScroll;