import { useQuery } from "@tanstack/react-query";
import { useParams, NavLink } from "react-router-dom";
import { fetchPostsRQIndv } from "../../API/api";

const FetchIndv = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPostsRQIndv(id), // api.get(`/posts/${id}`)
    });

    // console.log(data)

    if (isLoading) {
        return (
            <div className="flex justify-center py-40">
                <div className="h-1 w-20 bg-gray-900 overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (isError || !data) {
        return (
            <div className="text-center py-20">
                <p className="text-red-400 font-mono text-sm">Post not found.</p>
                <NavLink to="/rq" className="text-gray-500 hover:text-white text-xs mt-4 block">Return to list</NavLink>
            </div>
        );
    }

    const { title, body, userId } = data ?? {};

    return (
        <section className="max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Back Navigation */}
            <NavLink
                to={-1}
                className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-400 transition-colors mb-12"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to posts
            </NavLink>

            {/* Post Content */}
            <article>
                <header className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-[10px] font-mono px-2 py-0.5 border border-gray-800 text-gray-600 rounded">
                            POST ID: {id}
                        </span>
                        <span className="text-[10px] font-mono text-indigo-500/50">
                            AUTHOR: {userId}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight leading-tight capitalize">
                        {title}
                    </h1>
                </header>

                <div className="prose prose-invert">
                    <p className="text-gray-400 text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left">
                        {body} {body} {body}
                    </p>
                </div>

                {/* Decorative Footer */}
                <div className="mt-16 pt-8 border-t border-gray-900">
                    <p className="text-[10px] text-gray-700 uppercase tracking-[0.3em]">
                        End of Entry
                    </p>
                </div>
            </article>
        </section>
    );
};

export default FetchIndv;