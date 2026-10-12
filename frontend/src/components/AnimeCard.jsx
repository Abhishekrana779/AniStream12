import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Play, Info, Heart } from "lucide-react";
import { pickTitle, pickImage, pickScore, pickYear, pickFormat } from "../utils/helpers";
import { useAuth } from "../context/AuthContext";
import { userApi } from "../api";
import toast from "react-hot-toast";

export default function AnimeCard({ anime }) {
  const { isAuthenticated } = useAuth();
  const [imgError, setImgError] = useState(false);
  const title = pickTitle(anime.title);
  const image = !imgError ? pickImage(anime.coverImage) : "";
  const score = pickScore(anime);
  const year = pickYear(anime);
  const format = pickFormat(anime);
  const animeId = anime.id ?? anime.anilistId;

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login first");
      return;
    }
    try {
      await userApi.addFavorite(animeId, {
        animeTitle: title,
        animePoster: image,
        animeBanner: "",
        score: pickScore(anime),
        format: pickFormat(anime),
        status: anime.status || "",
        year: pickYear(anime),
        genres: anime.genres || [],
      });
      toast.success("Added to favorites");
    } catch (err) {
      toast.error("Failed to add favorite");
    }
  };

  if (!animeId) return null;

  return (
    <Link
      to={`/anime/${animeId}`}
      className="group relative rounded-2xl overflow-hidden glass gradient-border block"
    >
      <div className="aspect-[3/4] bg-gray-800 relative">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
          <Link
            to={`/watch/${animeId}/1`}
            onClick={(e) => e.stopPropagation()}
            className="p-3 rounded-full bg-primary/90 text-white hover:bg-primary transition"
            aria-label="Watch now"
          >
            <Play size={20} />
          </Link>
          <Link
            to={`/anime/${animeId}`}
            onClick={(e) => e.stopPropagation()}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition backdrop-blur-sm"
            aria-label="View details"
          >
            <Info size={20} />
          </Link>
          <button
            onClick={handleFavorite}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition backdrop-blur-sm"
            aria-label="Add to favorites"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white line-clamp-1">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          {score ? <span className="text-yellow-400 font-medium">{score}%</span> : null}
          {year ? <span>{year}</span> : null}
          {format ? <span className="px-2 py-0.5 rounded-full bg-white/10">{format}</span> : null}
        </div>
      </div>
    </Link>
  );
}
