import { useFetch } from "../hooks";
import { userApi } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";

export default function History() {
  const { data, loading, error, retry } = useFetch(() => userApi.getHistory(), ["history"]);
  const history = Array.isArray(data?.data) ? data.data : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Watch History</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={retry} className="px-4 py-2 rounded-xl bg-primary text-white">Retry</button>
        </div>
      )}
      {!loading && !error && history.length === 0 && (
        <div className="text-center py-20 text-gray-400">No watch history yet.</div>
      )}
      {!loading && history.length > 0 && (
        <div className="space-y-3">
          {history.map((item) => (
            <div key={item._id || `${item.animeId}-${item.episodeId}`} className="p-4 rounded-2xl glass flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{item.animeTitle || "Unknown"}</p>
                <p className="text-xs text-gray-400">Episode {item.episodeNumber || "?"} - {new Date(item.watchedAt).toLocaleString()}</p>
              </div>
              <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${Math.min(100, (item.progress / (item.duration || 1)) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
