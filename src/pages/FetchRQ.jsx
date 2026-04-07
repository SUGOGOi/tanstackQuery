import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, fetchPostsRQPagination, updatePost } from '../API/api';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { toast } from "react-hot-toast"

const FetchRQ = () => {
    const [pageNumber, setPageNumber] = useState(0);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', pageNumber],
        queryFn: () => fetchPostsRQPagination(pageNumber),
        placeholderData: keepPreviousData
    });

    const queryClient = useQueryClient()

    // Placeholder handlers for actions
    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['posts', pageNumber], (postsData) => {
                return postsData?.map((curPost) => {
                    return curPost.id === id ? { ...curPost, title: data.data.title } : curPost;
                })
            })

            toast.success("Post updated!")

            // console.log(data, id)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['posts', pageNumber], (curElem) => {
                return curElem?.filter((post) => post.id != id)
            })


            toast.success("Post deleted!")
        }
    })

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
                        className="group py-6 flex flex-col md:flex-row md:items-center gap-4 transition-colors hover:bg-white/[0.02] px-2 -mx-2 rounded-sm"
                    >
                        {/* ID */}
                        <span className="text-xs font-mono text-gray-600 w-8 shrink-0">
                            {String(post.id).padStart(2, '0')}
                        </span>

                        {/* Content */}
                        <div className="flex-grow min-w-0">
                            <NavLink to={`/rq/${post.id}`} className="text-gray-200 group-hover:text-indigo-400 transition-colors duration-300 font-medium truncate">
                                {post.title}
                            </NavLink>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1 group-hover:text-gray-400">
                                {post.body}
                            </p>
                        </div>

                        {/* Actions - Visible on Hover */}
                        <div className="flex gap-3 ">
                            <button
                                onClick={() => updateMutation.mutate(post.id)}
                                className="text-[10px] uppercase tracking-widest text-emerald-500 hover:text-emerald-400 font-bold cursor-pointer"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => deleteMutation.mutate(post.id)}
                                className="text-[10px] uppercase tracking-widest text-red-500 hover:text-red-400 font-bold cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Section */}
            <div className="flex items-center justify-center gap-8 py-12 mt-8 border-t border-gray-900">
                <button
                    disabled={pageNumber === 0}
                    onClick={() => setPageNumber((prev) => prev - 3)}
                    className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-indigo-400 disabled:opacity-20 disabled:hover:text-gray-500 transition-all"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Prev
                </button>

                <div className="flex items-center gap-3">
                    <span className="h-[1px] w-4 bg-gray-800"></span>
                    <p className="text-xs font-mono text-gray-400">
                        Page <span className="text-indigo-500">{pageNumber / 3 + 1}</span>
                    </p>
                    <span className="h-[1px] w-4 bg-gray-800"></span>
                </div>

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