import axios from "axios";

const ANILIST_URL = "https://graphql.anilist.co";

const MEDIA_FRAGMENT = `
  id
  idMal
  title { romaji english native }
  description
  coverImage { large extraLarge }
  bannerImage
  format
  type
  season
  seasonYear
  episodes
  duration
  status
  averageScore
  meanScore
  popularity
  favourites
  genres
  studios { nodes { name isAnimationStudio } }
  source
  countryOfOrigin
  isAdult
  startDate { year month day }
  endDate { year month day }
`;

const SORT_MAP = {
  popularity: "POPULARITY_DESC",
  score: "SCORE_DESC",
  trending: "TRENDING_DESC",
  newest: "UPDATED_AT_DESC",
};

const buildVariables = (page, perPage, sort, genre, format, status, year) => {
  const variables = {
    page: Number(page),
    perPage: Number(perPage),
    sort: Array.isArray(sort) ? sort : [sort],
  };

  if (genre) variables.genre = genre;
  if (format) variables.format = format;
  if (status) variables.status = status;
  if (year) variables.seasonYear = Number(year);

  return variables;
};

export const anilistService = {
  async getTrending() {
    const body = {
      query: `query ($page: Int, $perPage: Int, $sort: [MediaSort]) { Page(page: $page, perPage: $perPage) { pageInfo { total perPage currentPage lastPage hasNextPage } media(sort: $sort, type: ANIME) { ${MEDIA_FRAGMENT} } } }`,
      variables: buildVariables(1, 20, ["TRENDING_DESC"]),
    };
    const { data } = await axios.post(ANILIST_URL, body);
    return data.data.Page.media;
  },

  async getPopular() {
    const body = {
      query: `query ($page: Int, $perPage: Int, $sort: [MediaSort]) { Page(page: $page, perPage: $perPage) { pageInfo { total perPage currentPage lastPage hasNextPage } media(sort: $sort, type: ANIME) { ${MEDIA_FRAGMENT} } } }`,
      variables: buildVariables(1, 20, ["POPULARITY_DESC"]),
    };
    const { data } = await axios.post(ANILIST_URL, body);
    return data.data.Page.media;
  },

  async getRecent() {
    const body = {
      query: `query ($page: Int, $perPage: Int, $sort: [MediaSort]) { Page(page: $page, perPage: $perPage) { pageInfo { total perPage currentPage lastPage hasNextPage } media(sort: $sort, type: ANIME) { ${MEDIA_FRAGMENT} } } }`,
      variables: buildVariables(1, 20, ["UPDATED_AT_DESC"]),
    };
    const { data } = await axios.post(ANILIST_URL, body);
    return data.data.Page.media;
  },

  async filterAnime({ genre, year, format, status, sort, page = 1, per_page = 20 }) {
    const sortArr = sort ? [SORT_MAP[sort.toLowerCase()] || "POPULARITY_DESC"] : ["POPULARITY_DESC"];
    const body = {
      query: `query ($page: Int, $perPage: Int, $sort: [MediaSort], $genre: String, $format: MediaFormat, $status: MediaStatus, $seasonYear: Int) { Page(page: $page, perPage: $perPage) { pageInfo { total perPage currentPage lastPage hasNextPage } media(sort: $sort, type: ANIME, genre: $genre, format: $format, status: $status, seasonYear: $seasonYear) { ${MEDIA_FRAGMENT} } } }`,
      variables: buildVariables(page, per_page, sortArr, genre, format, status, year),
    };
    const { data } = await axios.post(ANILIST_URL, body);
    return { results: data.data.Page.media, page: data.data.Page.pageInfo.currentPage, total: data.data.Page.pageInfo.total };
  },

  async searchAnime(query, page = 1, perPage = 20) {
    const body = {
      query: `query ($page: Int, $perPage: Int, $search: String) { Page(page: $page, perPage: $perPage) { pageInfo { total perPage currentPage lastPage hasNextPage } media(search: $search, type: ANIME) { ${MEDIA_FRAGMENT} } } }`,
      variables: { page: Number(page), perPage: Number(perPage), search: query },
    };
    const { data } = await axios.post(ANILIST_URL, body);
    return { results: data.data.Page.media, page: data.data.Page.pageInfo.currentPage, total: data.data.Page.pageInfo.total };
  },
};
