import { useEffect } from "react";
import { animeApi } from "../api";
import { useFetch } from "../hooks";
import LoadingSpinner from "../components/LoadingSpinner";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Schedule() {
  const { data, loading, error, retry } = useFetch(() => animeApi.getSchedule(), ["schedule"]);
  const schedule = data?.data || data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Schedule</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={retry} className="px-4 py-2 rounded-xl bg-primary text-white">Retry</button>
        </div>
      )}
      {!loading && !error && (
        <div className="space-y-8">
          {DAYS.map((day) => {
            const items = Array.isArray(schedule[day]) ? schedule[day] : [];
            if (items.length === 0) return null;
            return (
              <section key={day}>
                <h2 className="text-xl font-bold text-white mb-3">{day}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl glass">
                      <p className="text-white font-medium line-clamp-1">{item.title || item.animeTitle || "Untitled"}</p>
                      <p className="text-xs text-gray-400 mt-1">Episode {item.episode ?? item.episodeNumber ?? "?"}</p>
                      {item.time ? <p className="text-xs text-gray-500">{item.time}</p> : null}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
