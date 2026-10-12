import { Link } from "react-router-dom";
import { Play, Plus, Info } from "lucide-react";
import { pickTitle, pickImage, pickBanner, pickScore, pickYear, pickFormat, pickStatus, pickEpisodes, pickGenres, pickDescription } from "../utils/helpers";
import { useAuth } from "../context/AuthContext";
import { userApi } from "../api";
import toast from "react-hot-toast";

export default function HeroBanner({ anime }) {
  const { isAuthenticated } = useAuth();
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

  const animeId = anime.id ?? anime.anilistId;

  const handleWatchlist = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }
    try {
      await userApi.addWatchlist(animeId, {
        animeTitle: title,
        animePoster: image,
        animeBanner: banner,
        totalEpisodes: episodes,
      });
      toast.success("Added to watchlist");
    } catch (err) {
      toast.error("Failed to add to watchlist");
    }
  };

  return (
    <div className="relative min-h-[70vh] flex items-end">
      <div className="absolute inset-0">
        <img
          src={banner || image}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-16 pt-32 flex flex-col md:flex-row items-end gap-8">
        <div className="shrink-0">
          <img
            src={image}
            alt={title}
            className="w-40 md:w-56 rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{title}</h1>
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {genres.map((genre) => (
              <span key={genre} className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                {genre}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-6">
            {score ? <span>Score: <strong className="text-yellow-400">{score}%</strong></span> : null}
            {year ? <span>Year: {year}</span> : null}
            {status ? <span>Status: {status.replace(/_/g, " ")}</span> : null}
            {episodes ? <span>Episodes: {episodes}</span> : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/watch/${animeId}/1`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/80 transition"
            >
              <Play size={18} />
              Watch Now
            </Link>
            <Link
              to={`/anime/${animeId}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass hover:bg-white/10 transition"
            >
              <Info size={18} />
              View Details
            </Link>
            <button
              onClick={handleWatchlist}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass hover:bg-white/10 transition"
            >
              <Plus size={18} />
              Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
