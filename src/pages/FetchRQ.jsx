

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPostsRQPagination } from '../API/api';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const FetchRQ = () => {
    const [pageNumber, setPageNumber] = useState(0)


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', pageNumber], //like useState
        queryFn: () => fetchPostsRQPagination(pageNumber), //like useEffect
        // gcTime: 1000 //cache remain for 1 min
        // staleTime: 10000,
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true,
        placeholderData: keepPreviousData
    })

    // console.log(data)

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <div className="h-4 w-4 bg-indigo-500 rounded-full animate-ping"></div>
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
        <section className="max-w-3xl mx-auto">
            <header className="mb-12">
                <h1 className="text-xl font-medium text-white tracking-tight">Posts</h1>
                <p className="text-sm text-gray-500">Tanstack Query/React Query state management.</p>
            </header>

            <div className="divide-y divide-gray-900">
                {data && data?.map((post) => (
                    <NavLink
                        to={`/rq/${post.id}`}
                        key={post.id}
                        className="group py-6 flex flex-col md:flex-row md:items-baseline gap-4 transition-colors hover:bg-white/[0.02] px-2 -mx-2 rounded-sm"
                    >
                        {/* ID - Fixed width for alignment */}
                        <span className="text-xs font-mono text-gray-600 w-8 shrink-0">
                            {String(post.id).padStart(2, '0')}
                        </span>

                        {/* Content */}
                        <div className="flex-grow">
                            <h2 className="text-gray-200 group-hover:text-indigo-400 transition-colors duration-300 font-medium">
                                {post.title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1 group-hover:text-gray-400">
                                {post.body}
                            </p>
                        </div>

                        {/* Action - Only visible on hover or mobile */}
                        {/* <div className="md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-white">
                                View
                            </button>
                        </div> */}
                    </NavLink>
                ))}
            </div>


            <div className="flex items-center justify-center gap-8 py-12 mt-8 border-t border-gray-900">
                {/* Prev Button */}
                <button
                    disabled={pageNumber === 0}
                    onClick={() => setPageNumber((prev) => prev - 3)}
                    className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-indigo-400 disabled:opacity-20 disabled:hover:text-gray-500 transition-all"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Prev
                </button>

                {/* Page Indicator */}
                <div className="flex items-center gap-3">
                    <span className="h-[1px] w-4 bg-gray-800"></span>
                    <p className="text-xs font-mono text-gray-400">
                        Page <span className="text-indigo-500">{pageNumber / 3 + 1}</span>
                    </p>
                    <span className="h-[1px] w-4 bg-gray-800"></span>
                </div>

                {/* Next Button */}
                <button
                    onClick={() => setPageNumber((prev) => prev + 3)}
                    className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-indigo-400 transition-all"
                >
                    Next <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
            </div>
        </section>
    );
};

export default FetchRQ;