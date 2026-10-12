import { useState, useEffect } from "react";
import { animeApi } from "../api";
import { useFetch } from "../hooks";
import AnimeCard from "../components/AnimeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { GENRES, FORMATS, STATUSES, SORTS } from "../utils/constants";
import { useSearchParams } from "react-router-dom";

export default function Browse() {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [animeList, setAnimeList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const genre = params.get("genre") || "";
  const year = params.get("year") || "";
  const format = params.get("format") || "";
  const status = params.get("status") || "";
  const sort = params.get("sort") || "";
  const search = params.get("q") || "";

  const { data, loading, error, retry } = useFetch(
    () => {
      if (search.trim()) {
        return animeApi.search(search, page, 20);
      }
      return animeApi.filter({
        genre: genre || undefined,
        year: year || undefined,
        format: format || undefined,
        status: status || undefined,
        sort: sort || undefined,
        page,
        per_page: 20,
      });
    },
    [genre, year, format, status, sort, page, search]
  );

  useEffect(() => {
    if (Array.isArray(data)) {
      setAnimeList(data);
    } else if (Array.isArray(data?.data)) {
      setAnimeList(data.data);
    } else {
      setAnimeList([]);
    }
    setTotalPages(1);
  }, [data]);

  const years = Array.from({ length: 40 }, (_, i) => 2025 - i);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Browse Anime</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Genre</label>
          <select
            value={genre}
            onChange={(e) => setParams((p) => { p.set("genre", e.target.value); setPage(1); return p; })}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
          >
            <option value="">All</option>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Year</label>
          <select
            value={year}
            onChange={(e) => setParams((p) => { p.set("year", e.target.value); setPage(1); return p; })}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
          >
            <option value="">All</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Format</label>
          <select
            value={format}
            onChange={(e) => setParams((p) => { p.set("format", e.target.value); setPage(1); return p; })}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
          >
            <option value="">All</option>
            {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Status</label>
          <select
            value={status}
            onChange={(e) => setParams((p) => { p.set("status", e.target.value); setPage(1); return p; })}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
          >
            <option value="">All</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Sort</label>
          <select
            value={sort}
            onChange={(e) => setParams((p) => { p.set("sort", e.target.value); setPage(1); return p; })}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm"
          >
            <option value="">Default</option>
            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={retry} className="px-4 py-2 rounded-xl bg-primary text-white">Retry</button>
        </div>
      )}

      {!loading && !error && animeList.length === 0 && (
        <div className="text-center py-20 text-gray-400">No anime found.</div>
      )}

      {!loading && animeList.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {animeList.map((anime) => <AnimeCard key={anime.id} anime={anime} />)}
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-4 py-2 rounded-xl glass disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-300">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 rounded-xl glass disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
