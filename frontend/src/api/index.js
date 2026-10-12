import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let clearAuth = null;

export const setClearAuth = (fn) => {
  clearAuth = fn;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth?.();
    }
    return Promise.reject(error);
  }
);

export const animeApi = {
  getTrending: () => api.get("/anime/trending"),
  getPopular: () => api.get("/anime/popular"),
  getRecent: () => api.get("/anime/recent"),
  getUpcoming: () => api.get("/anime/upcoming"),
  getSpotlight: () => api.get("/anime/spotlight"),
  getSchedule: () => api.get("/anime/schedule"),
  search: (query, page = 1, perPage = 20) => api.get("/anime/search", { params: { query, page, per_page: perPage } }),
  filter: (params = {}) => api.get("/anime/filter", { params }),
  getInfo: (id) => api.get(`/anime/${id}`),
  getCharacters: (id) => api.get(`/anime/${id}/characters`),
  getRelations: (id) => api.get(`/anime/${id}/relations`),
  getRecommendations: (id) => api.get(`/anime/${id}/recommendations`),
  getEpisodes: (id) => api.get(`/anime/${id}/episodes`),
  getStream: (provider, anilistId, category, slug) =>
    api.get(`/anime/watch/${provider}/${anilistId}/${category}/${slug}`),
};

export const authApi = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
};

export const userApi = {
  getProfile: () => api.get("/users/profile"),
  getFavorites: () => api.get("/users/favorites"),
  addFavorite: (animeId, data = {}) => api.post(`/users/favorites/${animeId}`, data),
  removeFavorite: (animeId) => api.delete(`/users/favorites/${animeId}`),
  getWatchlist: () => api.get("/users/watchlist"),
  addWatchlist: (animeId, data = {}) => api.post(`/users/watchlist/${animeId}`, data),
  removeWatchlist: (animeId) => api.delete(`/users/watchlist/${animeId}`),
  getHistory: () => api.get("/users/history"),
  upsertHistory: (data) => api.post("/users/history", data),
};
