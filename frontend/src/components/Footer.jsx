import { Link } from "react-router-dom";
import { Github } from "lucide-react";

const LINKS = [
  { to: "/", label: "About" },
  { to: "/browse", label: "Browse" },
  { to: "/trending", label: "Trending" },
  { to: "/popular", label: "Popular" },
  { to: "/schedule", label: "Schedule" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-black">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ani</span>
              <span className="text-white">Stream</span>
            </Link>
            <p className="text-xs text-gray-500 mt-2">Anime metadata and streaming availability are provided through external services.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            {LINKS.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-white transition">
                {item.label}
              </Link>
            ))}
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition inline-flex items-center gap-1">
              <Github size={16} />
              GitHub
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-600 mt-8">
          <Link to="/privacy" className="hover:text-gray-400">Privacy</Link>
          <Link to="/terms" className="hover:text-gray-400">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
