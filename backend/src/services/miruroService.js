import axios from "axios";

const BASE = process.env.MIRURO_API_URL || "https://miruroapi-bgdh.onrender.com";
const client = axios.create({ baseURL: BASE, timeout: 15000 });

const cache = new Map();
const TTL_MS = 60 * 1000;

const getCached = (key) => {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.ts > TTL_MS) {
    cache.delete(key);
    return null;
  }
  return hit.data;
};

const setCache = (key, data) => cache.set(key, { ts: Date.now(), data });

export const miruroService = {
  async getTrending() {
    const key = "trending";
    const cached = getCached(key);
    if (cached) return cached;
    const { data } = await client.get("/trending");
    setCache(key, data);
    return data;
  },

  async getPopular() {
    const key = "popular";
    const cached = getCached(key);
    if (cached) return cached;
    const { data } = await client.get("/popular");
    setCache(key, data);
    return data;
  },

  async getRecent() {
    const key = "recent";
    const cached = getCached(key);
    if (cached) return cached;
    const { data } = await client.get("/recent");
    setCache(key, data);
    return data;
  },

  async getUpcoming() {
    const key = "upcoming";
    const cached = getCached(key);
    if (cached) return cached;
    const { data } = await client.get("/upcoming");
    setCache(key, data);
    return data;
  },

  async getSpotlight() {
    const key = "spotlight";
    const cached = getCached(key);
    if (cached) return cached;
    const { data } = await client.get("/spotlight");
    setCache(key, data);
    return data;
  },

  async getSchedule() {
    const key = "schedule";
    const cached = getCached(key);
    if (cached) return cached;
    const { data } = await client.get("/schedule");
    setCache(key, data);
    return data;
  },

  async searchAnime(query, page = 1, perPage = 20) {
    const { data } = await client.get("/search", {
      params: { query, page, per_page: perPage },
    });
    return data;
  },

  async filterAnime(params = {}) {
    const { data } = await client.get("/filter", { params });
    return data;
  },

  async getAnimeInfo(anilistId) {
    const key = `info:${anilistId}`;
    const cached = getCached(key);
    if (cached) return cached;
    const { data } = await client.get(`/info/${encodeURIComponent(anilistId)}`);
    setCache(key, data);
    return data;
  },

  async getCharacters(anilistId) {
    const { data } = await client.get(`/anime/${encodeURIComponent(anilistId)}/characters`);
    return data;
  },

  async getRelations(anilistId) {
    const { data } = await client.get(`/anime/${encodeURIComponent(anilistId)}/relations`);
    return data;
  },

  async getRecommendations(anilistId) {
    const { data } = await client.get(`/anime/${encodeURIComponent(anilistId)}/recommendations`);
    return data;
  },

  async getEpisodes(anilistId) {
    const { data } = await client.get(`/episodes/${encodeURIComponent(anilistId)}`);
    return data;
  },

  async getStream({ provider, anilistId, category, slug }) {
    const { data } = await client.get(
      `/watch/${encodeURIComponent(provider)}/${encodeURIComponent(anilistId)}/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`
    );
    return data;
  },
};
