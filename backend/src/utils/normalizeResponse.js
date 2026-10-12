import { pickTitle, pickImage, pickBanner, pickScore, pickYear, pickFormat, pickStatus, pickEpisodes, pickGenres, pickDescription } from "../utils/normalize.js";

export const normalizeAnimeList = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data.map(normalizeAnime);
  if (Array.isArray(data.data)) return data.data.map(normalizeAnime);
  if (Array.isArray(data.results)) return data.results.map(normalizeAnime);
  return [];
};

export const normalizeAnime = (anime = {}) => ({
  id: anime.id ?? anime.anilistId ?? null,
  anilistId: anime.anilistId ?? anime.id ?? null,
  title: anime.title || {},
  coverImage: anime.coverImage || {},
  bannerImage: anime.bannerImage || "",
  averageScore: anime.averageScore ?? null,
  meanScore: anime.meanScore ?? null,
  popularity: anime.popularity ?? null,
  favourites: anime.favourites ?? anime.favorites ?? null,
  genres: Array.isArray(anime.genres) ? anime.genres : [],
  episodes: anime.episodes ?? null,
  duration: anime.duration ?? null,
  status: anime.status || "",
  format: anime.format || "",
  seasonYear: anime.seasonYear ?? anime.year ?? null,
  description: anime.description || "",
  studios: anime.studios || [],
  producers: anime.producers || [],
  source: anime.source || "",
  country: anime.country || "",
});

export const normalizeAnimeInfo = (anime = {}) => ({
  ...normalizeAnime(anime),
  title: anime.title || {},
  synonyms: Array.isArray(anime.synonyms) ? anime.synonyms : [],
  tags: Array.isArray(anime.tags) ? anime.tags : [],
  trailer: anime.trailer || {},
  relationships: Array.isArray(anime.relationships) ? anime.relationships : [],
  recommendations: Array.isArray(anime.recommendations) ? anime.recommendations : [],
});

export const normalizeCharacter = (char = {}) => ({
  id: char.id ?? char.character?.id ?? null,
  name: char.name || char.character?.name || {},
  role: char.role || "",
  image: char.image || char.character?.image || {},
});

export const normalizeRelation = (rel = {}) => ({
  id: rel.id ?? rel.node?.id ?? null,
  title: rel.node?.title || rel.title || {},
  relationType: rel.relationType || rel.relation || "",
});

export const normalizeRecommendation = (rec = {}) => ({
  id: rec.id ?? rec.node?.id ?? null,
  title: rec.node?.title || rec.title || {},
  score: rec.node?.meanScore ?? rec.meanScore ?? null,
  coverImage: rec.node?.coverImage || rec.coverImage || {},
});
