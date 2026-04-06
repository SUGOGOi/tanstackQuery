

import { useQuery } from '@tanstack/react-query';
import { fetchPostsRQ } from '../API/api';

const FetchRQ = () => {


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts'], //like useState
        queryFn: fetchPostsRQ //like useEffect
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
                    <div
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
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FetchRQ;