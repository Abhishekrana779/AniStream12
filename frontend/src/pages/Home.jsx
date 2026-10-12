import { useEffect, useState } from "react";
import { animeApi } from "../api";
import { useFetch } from "../hooks";
import HeroBanner from "../components/HeroBanner";
import AnimeCard from "../components/AnimeCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Section({ title, children }) {
  const scrollRef = useState(null);
  const ref = scrollRef[0];
  const setRef = scrollRef[1];

  const scroll = (dir) => {
    if (!ref) return;
    ref.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="p-2 rounded-xl glass hover:bg-white/10" aria-label="Scroll left">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => scroll(1)} className="p-2 rounded-xl glass hover:bg-white/10" aria-label="Scroll right">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div ref={setRef} className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  const [spotlight, setSpotlight] = useState(null);
  const { data: trending, loading: trendingLoading } = useFetch(() => animeApi.getTrending(), ["trending"]);
  const { data: popular, loading: popularLoading } = useFetch(() => animeApi.getPopular(), ["popular"]);
  const { data: recent, loading: recentLoading } = useFetch(() => animeApi.getRecent(), ["recent"]);
  const { data: upcoming, loading: upcomingLoading } = useFetch(() => animeApi.getUpcoming(), ["upcoming"]);

  useEffect(() => {
    animeApi.getSpotlight().then((res) => setSpotlight(res.data.data)).catch(() => {});
  }, []);

  const list = (data) => {
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return [];
  };

  return (
    <div>
      {spotlight && <HeroBanner anime={spotlight} />}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Section title="Trending">
          {trendingLoading ? (
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="shrink-0 w-40"><div className="aspect-[3/4] bg-gray-800 rounded-2xl animate-pulse" /></div>)
          ) : (
            list(trending).map((anime) => <div key={anime.id} className="shrink-0 w-40"><AnimeCard anime={anime} /></div>)
          )}
        </Section>

        <Section title="Popular">
          {popularLoading ? (
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="shrink-0 w-40"><div className="aspect-[3/4] bg-gray-800 rounded-2xl animate-pulse" /></div>)
          ) : (
            list(popular).map((anime) => <div key={anime.id} className="shrink-0 w-40"><AnimeCard anime={anime} /></div>)
          )}
        </Section>

        <Section title="Recently Updated">
          {recentLoading ? (
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="shrink-0 w-40"><div className="aspect-[3/4] bg-gray-800 rounded-2xl animate-pulse" /></div>)
          ) : (
            list(recent).map((anime) => <div key={anime.id} className="shrink-0 w-40"><AnimeCard anime={anime} /></div>)
          )}
        </Section>

        <Section title="Upcoming">
          {upcomingLoading ? (
            Array.from({ length: 6 }).map((_, i) => <div key={i} className="shrink-0 w-40"><div className="aspect-[3/4] bg-gray-800 rounded-2xl animate-pulse" /></div>)
          ) : (
            list(upcoming).map((anime) => <div key={anime.id} className="shrink-0 w-40"><AnimeCard anime={anime} /></div>)
          )}
        </Section>
      </div>
    </div>
  );
}
