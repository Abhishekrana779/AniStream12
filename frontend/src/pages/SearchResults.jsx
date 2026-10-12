import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { animeApi } from "../api";
import { useFetch } from "../hooks";
import AnimeCard from "../components/AnimeCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [page, setPage] = useState(1);
  const { data, loading, error, retry } = useFetch(() => animeApi.search(query, page, 20), [query, page]);
  const results = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Search: {query}</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={retry} className="px-4 py-2 rounded-xl bg-primary text-white">Retry</button>
        </div>
      )}
      {!loading && !error && results.length === 0 && (
        <div className="text-center py-20 text-gray-400">No results found.</div>
      )}
      {!loading && results.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((anime) => <AnimeCard key={anime.id} anime={anime} />)}
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="px-4 py-2 rounded-xl glass disabled:opacity-50">Prev</button>
            <span className="text-gray-300">Page {page}</span>
            <button onClick={() => setPage((p) => p + 1)} className="px-4 py-2 rounded-xl glass">Next</button>
          </div>
        </>
      )}
    </div>
  );
}
