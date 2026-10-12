import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function EpisodeList({ episodes, currentEpisodeId, onSelect, animeTitle }) {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(null);

  const list = useMemo(() => {
    if (!episodes || !Array.isArray(episodes)) return [];
    const source = filtered !== null ? filtered : episodes;
    return source;
  }, [episodes, filtered]);

  const handleSearch = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setFiltered(null);
      return;
    }
    const lower = value.toLowerCase();
    const result = episodes.filter((ep) => {
      const num = String(ep.number || ep.episode || "").toLowerCase();
      const title = String(ep.title || "").toLowerCase();
      return num.includes(lower) || title.includes(lower);
    });
    setFiltered(result);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <h3 className="text-white font-semibold mb-2">Episodes</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search episodes..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {list.map((ep, idx) => {
          const epId = ep.id || ep.slug || String(idx + 1);
          const epNumber = ep.number || ep.episode || idx + 1;
          const isActive = String(epId) === String(currentEpisodeId);
          return (
            <button
              key={epId}
              onClick={() => onSelect?.(ep)}
              className={`w-full text-left p-3 rounded-xl border transition ${
                isActive
                  ? "border-primary bg-primary/20"
                  : "border-white/5 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Episode {epNumber}</span>
                {ep.title ? (
                  <span className="text-xs text-gray-400 truncate max-w-[120px]">{ep.title}</span>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
