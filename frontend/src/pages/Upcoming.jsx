import { animeApi } from "../api";
import { useFetch } from "../hooks";
import AnimeCard from "../components/AnimeCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Upcoming() {
  const { data, loading, error, retry } = useFetch(() => animeApi.getUpcoming(), ["upcoming"]);
  const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Upcoming Anime</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={retry} className="px-4 py-2 rounded-xl bg-primary text-white">Retry</button>
        </div>
      )}
      {!loading && !error && list.length === 0 && (
        <div className="text-center py-20 text-gray-400">No upcoming anime found.</div>
      )}
      {!loading && list.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {list.map((anime) => <AnimeCard key={anime.id} anime={anime} />)}
        </div>
      )}
    </div>
  );
}
