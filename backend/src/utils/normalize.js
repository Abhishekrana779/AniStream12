export const pickTitle = (title = {}) => {
  return title.english || title.romaji || title.native || "Unknown Anime";
};

export const pickImage = (image = {}) => {
  return image.extraLarge || image.large || image.medium || "";
};

export const pickBanner = (anime = {}) => {
  return anime.bannerImage || anime.coverImage?.extraLarge || anime.coverImage?.large || "";
};

export const pickScore = (anime = {}) => {
  return anime.averageScore || anime.meanScore || null;
};

export const pickYear = (anime = {}) => {
  return anime.seasonYear || anime.startDate?.year || null;
};

export const pickFormat = (anime = {}) => {
  return anime.format || "";
};

export const pickStatus = (anime = {}) => {
  return anime.status || "";
};

export const pickEpisodes = (anime = {}) => {
  return anime.episodes ?? null;
};

export const pickGenres = (anime = {}) => {
  return Array.isArray(anime.genres) ? anime.genres : [];
};

export const pickDescription = (anime = {}) => {
  return anime.description || "";
};
