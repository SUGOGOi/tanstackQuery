import React, { useEffect, useState } from 'react';
import { fetchPostsOld } from '../API/api';

const FetchOld = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPostData = async () => {
        try {
            const res = await fetchPostsOld();
            setPosts(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getPostData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="h-4 w-4 bg-indigo-500 rounded-full animate-ping"></div>
            </div>
        );
    }

    return (
        <section className="max-w-3xl mx-auto">
            <header className="mb-12">
                <h1 className="text-xl font-medium text-white tracking-tight">Posts</h1>
                <p className="text-sm text-gray-500">Traditional state management.</p>
            </header>

            <div className="divide-y divide-gray-900">
                {posts?.map((post) => (
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

export default FetchOld;