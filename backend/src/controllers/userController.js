import Favorite from "../models/Favorite.js";
import Watchlist from "../models/Watchlist.js";
import WatchHistory from "../models/WatchHistory.js";

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).sort({ addedAt: -1 });
    res.json({ success: true, data: favorites });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch favorites" });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { animeTitle, animePoster, animeBanner, score, format, status, year, genres } = req.body;
    const fav = await Favorite.findOneAndUpdate(
      { user: req.user._id, animeId: Number(req.params.animeId) },
      { animeTitle: String(animeTitle || ""), animePoster: String(animePoster || ""), animeBanner: String(animeBanner || ""), score: Number(score) || null, format: String(format || ""), status: String(status || ""), year: Number(year) || null, genres: Array.isArray(genres) ? genres : [] },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, data: fav });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add favorite" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { animeId } = req.params;
    await Favorite.findOneAndDelete({ user: req.user._id, animeId: Number(animeId) });
    res.json({ success: true, message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to remove favorite" });
  }
};

export const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json({ success: true, data: watchlist });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch watchlist" });
  }
};

export const addWatchlist = async (req, res) => {
  try {
    const { animeTitle, animePoster, animeBanner, totalEpisodes } = req.body;
    const item = await Watchlist.findOneAndUpdate(
      { user: req.user._id, animeId: Number(req.params.animeId) },
      { animeTitle: String(animeTitle || ""), animePoster: String(animePoster || ""), animeBanner: String(animeBanner || ""), totalEpisodes: Number(totalEpisodes) || null, updatedAt: Date.now() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add watchlist" });
  }
};

export const removeWatchlist = async (req, res) => {
  try {
    const { animeId } = req.params;
    await Watchlist.findOneAndDelete({ user: req.user._id, animeId: Number(animeId) });
    res.json({ success: true, message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to remove watchlist" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await WatchHistory.find({ user: req.user._id }).sort({ watchedAt: -1 });
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch history" });
  }
};

export const upsertHistory = async (req, res) => {
  try {
    const { animeId, episodeId, episodeNumber, animeTitle, animePoster, progress, duration } = req.body;
    if (!animeId || !episodeId) {
      return res.status(400).json({ success: false, message: "animeId and episodeId are required" });
    }
    const history = await WatchHistory.findOneAndUpdate(
      { user: req.user._id, animeId: Number(animeId), episodeId: String(episodeId) },
      { episodeNumber: Number(episodeNumber) || 0, animeTitle: String(animeTitle || ""), animePoster: String(animePoster || ""), progress: Number(progress) || 0, duration: Number(duration) || 0, watchedAt: Date.now() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ success: true, data: history });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to save history" });
  }
};
