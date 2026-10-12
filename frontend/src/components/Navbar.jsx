import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User, Heart, ListVideo, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse" },
  { to: "/trending", label: "Trending" },
  { to: "/popular", label: "Popular" },
  { to: "/schedule", label: "Schedule" },
];

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/" className="text-2xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ani</span>
            <span className="text-white">Stream</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 ml-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Link
              to="/search"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-primary transition"
            >
              Search anime...
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link to="/search" className="md:hidden p-2 rounded-xl hover:bg-white/10 transition" aria-label="Search">
            <Search size={20} />
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/favorites" className="p-2 rounded-xl hover:bg-white/10 transition" aria-label="Favorites">
                <Heart size={20} />
              </Link>
              <Link to="/watchlist" className="p-2 rounded-xl hover:bg-white/10 transition" aria-label="Watchlist">
                <ListVideo size={20} />
              </Link>
              <Link to="/profile" className="p-2 rounded-xl hover:bg-white/10 transition" aria-label="Profile">
                <User size={20} />
              </Link>
              <button onClick={logout} className="p-2 rounded-xl hover:bg-white/10 transition" aria-label="Logout">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/80 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 px-4 py-4 space-y-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Link
              to="/search"
              onClick={() => setOpen(false)}
              className="block w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300"
            >
              Search anime...
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
