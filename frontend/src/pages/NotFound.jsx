import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          404
        </h1>
        <p className="text-xl text-gray-300 mb-8">Looks like this anime wandered into another dimension.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition"
          >
            <Home size={18} />
            Go Home
          </Link>
          <Link
            to="/browse"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-white/10 transition"
          >
            <Search size={18} />
            Browse Anime
          </Link>
        </div>
      </div>
    </div>
  );
}
