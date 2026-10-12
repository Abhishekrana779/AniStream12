import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { animeApi, userApi } from "../api";
import { useFetch } from "../hooks";
import VideoPlayer from "../components/VideoPlayer";
import EpisodeList from "../components/EpisodeList";
import LoadingSpinner from "../components/LoadingSpinner";
import { pickTitle, pickImage } from "../utils/helpers";
import { useAuth } from "../context/AuthContext";

export default function Watch() {
  const { anilistId, episodeId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [animeTitle, setAnimeTitle] = useState("");
  const lastSaveRef = useRef(0);

  const { data, loading } = useFetch(() => animeApi.getEpisodes(anilistId), [anilistId]);
  const episodes = useMemo(() => {
    const list = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    return list;
  }, [data]);

  const saveHistory = useCallback(async (currentTime, duration) => {
    if (!isAuthenticated) return;
    const now = Date.now();
    if (now - lastSaveRef.current < 5000) return;
    lastSaveRef.current = now;
    const ep = episodes.find((e) => String(e.id || e.slug) === String(episodeId));
    if (!ep) return;
    try {
      await userApi.upsertHistory({
        animeId: anilistId,
        episodeId: ep.id || ep.slug,
        episodeNumber: ep.number || ep.episode || 0,
        animeTitle: animeTitle || ep.title || "",
        animePoster: "",
        progress: Math.floor(currentTime),
        duration: Math.floor(duration),
      });
    } catch (err) {
      // ignore history save errors
    }
  }, [anilistId, episodeId, episodes, animeTitle, isAuthenticated]);

  useEffect(() => {
    if (!episodeId && episodes.length > 0) {
      const first = episodes[0];
      const firstId = first.id || first.slug;
      navigate(`/watch/${anilistId}/${firstId}`, { replace: true });
    }
  }, [anilistId, episodeId, episodes, navigate]);

  useEffect(() => {
    let isMounted = true;
    setError(null);
    setStream(null);

    const ep = episodes.find((e) => String(e.id || e.slug) === String(episodeId));
    if (!ep) return;

    setAnimeTitle((prev) => ep.title || prev);

    const provider = ep.provider || "vidstreaming";
    const category = ep.category || "";
    const slug = ep.id || ep.slug;

    animeApi
      .getStream(provider, anilistId, category, slug)
      .then((res) => {
        if (isMounted) setStream(res.data);
      })
      .catch((err) => {
        if (isMounted) setError("Unable to load this episode right now. Please try another provider or episode.");
      });

    return () => {
      isMounted = false;
    };
  }, [anilistId, episodeId, episodes]);

  const handleSelectEpisode = (ep) => {
    const slug = ep.id || ep.slug;
    navigate(`/watch/${anilistId}/${slug}`);
  };

  const currentIdx = episodes.findIndex((ep) => String(ep.id || ep.slug) === String(episodeId));
  const nextEpisode = episodes[currentIdx + 1];
  const prevEpisode = episodes[currentIdx - 1];

  const displayTitle = animeTitle || "Episode";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          {loading && <LoadingSpinner />}
          {error && <p className="text-red-400">{error}</p>}
          {stream?.sources && stream.sources.length > 0 && (
            <VideoPlayer
              src={stream.sources[0]?.url || stream.sources[0]?.file}
              title={displayTitle}
              onTimeUpdate={saveHistory}
              onEnded={() => {
                saveHistory(0, 0);
                if (nextEpisode) {
                  const nextSlug = nextEpisode.id || nextEpisode.slug;
                  navigate(`/watch/${anilistId}/${nextSlug}`);
                }
              }}
            />
          )}
          {!loading && !error && !stream && <LoadingSpinner />}
          <div className="flex items-center gap-2 mt-4">
            {prevEpisode && (
              <Link to={`/watch/${anilistId}/${prevEpisode.id || prevEpisode.slug}`} className="px-4 py-2 rounded-xl glass hover:bg-white/10">
                <ChevronLeft size={18} className="inline mr-1" />
                Previous
              </Link>
            )}
            {nextEpisode && (
              <Link to={`/watch/${anilistId}/${nextEpisode.id || nextEpisode.slug}`} className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/80">
                Next
                <ChevronRight size={18} className="inline ml-1" />
              </Link>
            )}
          </div>
        </div>
        <div className="w-full lg:w-96 h-[600px]">
          <EpisodeList episodes={episodes} currentEpisodeId={episodeId} onSelect={handleSelectEpisode} animeTitle={animeTitle} />
        </div>
      </div>
    </div>
  );
}
