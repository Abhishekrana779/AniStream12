import { useFetch } from "../hooks";
import { userApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import AnimeCard from "../components/AnimeCard";

export default function Favorites() {
  const { data, loading, error, retry } = useFetch(() => userApi.getFavorites(), ["favorites"]);
  const favorites = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Favorites</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={retry} className="px-4 py-2 rounded-xl bg-primary text-white">Retry</button>
        </div>
      )}
      {!loading && !error && favorites.length === 0 && (
        <div className="text-center py-20 text-gray-400">No favorites yet.</div>
      )}
      {!loading && favorites.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((fav) => <AnimeCard key={fav.animeId || fav._id} anime={fav} />)}
        </div>
      )}
    </div>
  );
}
