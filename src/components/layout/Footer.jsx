export const Footer = () => {
    return (
        <footer className="py-10 border-t border-gray-900 bg-black">
            <div className="text-center">
                <p className="text-xs uppercase tracking-widest text-gray-600">
                    © {new Date().getFullYear()} — SumsumGogoi
                </p>
            </div>
        </footer>
    );
};