import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Plus, Heart, Star, Calendar, Film, Clock, Tv } from "lucide-react";
import { animeApi } from "../api";
import { useFetch } from "../hooks";
import { pickTitle, pickImage, pickBanner, pickScore, pickYear, pickFormat, pickStatus, pickEpisodes, pickGenres, pickDescription } from "../utils/helpers";
import LoadingSpinner from "../components/LoadingSpinner";
import { userApi } from "../api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import AnimeCard from "../components/AnimeCard";

export default function AnimeDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [tab, setTab] = useState("characters");

  const { data, loading, error, retry } = useFetch(() => animeApi.getInfo(id), [id]);
  const { data: characters } = useFetch(() => animeApi.getCharacters(id), [id, "characters"]);
  const { data: relations } = useFetch(() => animeApi.getRelations(id), [id, "relations"]);
  const { data: recommendations } = useFetch(() => animeApi.getRecommendations(id), [id, "recommendations"]);

  const [inFav, setInFav] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !id) return;
    userApi.getFavorites()
      .then((res) => setInFav(Array.isArray(res.data) && res.data.some((f) => String(f.animeId) === String(id))))
      .catch(() => {});
  }, [id, isAuthenticated]);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <p className="text-red-400 mb-4">{error}</p>
      <button onClick={retry} className="px-4 py-2 rounded-xl bg-primary text-white">Retry</button>
    </div>
  );

  const anime = data?.data || data || {};
  const title = pickTitle(anime.title);
  const image = pickImage(anime.coverImage);
  const banner = pickBanner(anime);
  const score = pickScore(anime);
  const year = pickYear(anime);
  const format = pickFormat(anime);
  const status = pickStatus(anime);
  const episodes = pickEpisodes(anime);
  const genres = pickGenres(anime);
  const description = pickDescription(anime);

  const toggleFav = async () => {
    if (!isAuthenticated) return toast.error("Please login first");
    try {
      if (inFav) {
        await userApi.removeFavorite(anime.id);
        setInFav(false);
        toast.success("Removed from favorites");
      } else {
        await userApi.addFavorite(anime.id, {
          animeTitle: title,
          animePoster: image,
          animeBanner: banner,
          score: pickScore(anime),
          format: pickFormat(anime),
          status: pickStatus(anime),
          year: pickYear(anime),
          genres: genres,
        });
        setInFav(true);
        toast.success("Added to favorites");
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  return (
    <div>
      <div className="relative min-h-[40vh] flex items-end">
        <div className="absolute inset-0">
          <img src={banner || image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-12 pt-28 flex flex-col md:flex-row items-end gap-6">
          <img src={image} alt={title} className="w-32 md:w-48 rounded-2xl shadow-2xl border border-white/10" />
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{title}</h1>
            <p className="text-gray-300 text-sm mb-3 line-clamp-2 max-w-2xl">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map((g) => (
                <span key={g} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">{g}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/watch/${anime.id}/1`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition"
              >
                <Play size={18} />
                Watch Now
              </Link>
              <button onClick={toggleFav} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass hover:bg-white/10 transition">
                <Heart size={18} className={inFav ? "text-red-500 fill-red-500" : ""} />
                {inFav ? "Favorited" : "Favorite"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Score", value: score ? `${score}%` : "N/A", icon: Star },
            { label: "Episodes", value: episodes ?? "?", icon: Tv },
            { label: "Status", value: status?.replace(/_/g, " ") || "N/A", icon: Film },
            { label: "Year", value: year ?? "N/A", icon: Calendar },
            { label: "Format", value: format || "N/A", icon: Tv },
            { label: "Duration", value: anime.duration ? `${anime.duration} min` : "N/A", icon: Clock },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-2xl glass">
              <p className="text-xs text-gray-400 mb-1">{item.label}</p>
              <p className="text-white font-semibold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {["characters", "relations", "recommendations"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab === t ? "bg-primary text-white" : "glass hover:bg-white/10 text-gray-300"}`}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "characters" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(characters?.data || characters || []).map((c) => (
              <div key={c.id || c.character?.id} className="p-4 rounded-2xl glass">
                <p className="text-white font-medium line-clamp-1">{c.name?.full || c.character?.name?.full || "Unknown"}</p>
                <p className="text-xs text-gray-400">{c.role || ""}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "relations" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(relations?.data || relations || []).map((r) => (
              <div key={r.id || r.node?.id} className="p-4 rounded-2xl glass">
                <p className="text-white font-medium line-clamp-1">{r.node?.title?.english || r.node?.title?.romaji || "Related"}</p>
                <p className="text-xs text-gray-400">{r.relationType || ""}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "recommendations" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {(recommendations?.data || recommendations || []).map((r, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass">
                <p className="text-white font-medium line-clamp-1">{r.node?.title?.english || r.node?.title?.romaji || "Recommended"}</p>
                <p className="text-xs text-gray-400">{r.node?.meanScore ? `${r.node.meanScore}%` : ""}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
