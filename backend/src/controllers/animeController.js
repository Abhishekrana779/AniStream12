import { miruroService } from "../services/miruroService.js";
import { anilistService } from "../services/anilistService.js";
import { normalizeAnimeList, normalizeAnimeInfo, normalizeCharacter, normalizeRelation, normalizeRecommendation } from "../utils/normalizeResponse.js";

export const getTrending = async (req, res) => {
  try {
    const data = await anilistService.getTrending();
    res.json({ success: true, data: normalizeAnimeList(data) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch trending anime" });
  }
};

export const getPopular = async (req, res) => {
  try {
    const data = await anilistService.getPopular();
    res.json({ success: true, data: normalizeAnimeList(data) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch popular anime" });
  }
};

export const getRecent = async (req, res) => {
  try {
    const data = await anilistService.getRecent();
    res.json({ success: true, data: normalizeAnimeList(data) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch recent anime" });
  }
};

export const getUpcoming = async (req, res) => {
  try {
    const data = await miruroService.getUpcoming();
    res.json({ success: true, data: normalizeAnimeList(data) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch upcoming anime" });
  }
};

export const getSpotlight = async (req, res) => {
  try {
    const data = await miruroService.getSpotlight();
    const normalized = normalizeAnimeList(data);
    res.json({ success: true, data: normalized[0] || null });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch spotlight anime" });
  }
};

export const getSchedule = async (req, res) => {
  try {
    const data = await miruroService.getSchedule();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch schedule" });
  }
};

export const searchAnime = async (req, res) => {
  try {
    const { query, page = 1, per_page = 20 } = req.query;
    if (!query) {
      return res.status(400).json({ success: false, message: "Query is required" });
    }
    const data = await anilistService.searchAnime(query, Number(page), Number(per_page));
    res.json({ success: true, data: normalizeAnimeList(data.results) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Search failed" });
  }
};

export const filterAnime = async (req, res) => {
  try {
    const { genre, year, format, status, sort, page = 1, per_page = 20 } = req.query;
    const data = await anilistService.filterAnime({ genre, year, format, status, sort, page, per_page });
    res.json({ success: true, data: normalizeAnimeList(data.results) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Filter failed" });
  }
};

export const getAnimeInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await miruroService.getAnimeInfo(id);
    res.json({ success: true, data: normalizeAnimeInfo(data) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch anime info" });
  }
};

export const getAnimeCharacters = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await miruroService.getCharacters(id);
    const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    res.json({ success: true, data: list.map(normalizeCharacter) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch characters" });
  }
};

export const getAnimeRelations = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await miruroService.getRelations(id);
    const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    res.json({ success: true, data: list.map(normalizeRelation) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch relations" });
  }
};

export const getAnimeRecommendations = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await miruroService.getRecommendations(id);
    const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    res.json({ success: true, data: list.map(normalizeRecommendation) });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch recommendations" });
  }
};

export const getEpisodes = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await miruroService.getEpisodes(id);
    const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch episodes" });
  }
};

export const getStream = async (req, res) => {
  try {
    const { provider, anilistId, category, slug } = req.params;
    const data = await miruroService.getStream({ provider, anilistId, category, slug });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Unable to load stream" });
  }
};
