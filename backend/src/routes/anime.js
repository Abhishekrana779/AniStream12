import express from "express";
import {
  getTrending,
  getPopular,
  getRecent,
  getUpcoming,
  getSpotlight,
  getSchedule,
  searchAnime,
  filterAnime,
  getAnimeInfo,
  getAnimeCharacters,
  getAnimeRelations,
  getAnimeRecommendations,
  getEpisodes,
  getStream,
} from "../controllers/animeController.js";

const router = express.Router();

router.get("/", getTrending);

router.get("/trending", getTrending);
router.get("/popular", getPopular);
router.get("/recent", getRecent);
router.get("/upcoming", getUpcoming);
router.get("/spotlight", getSpotlight);
router.get("/schedule", getSchedule);
router.get("/search", searchAnime);
router.get("/filter", filterAnime);
router.get("/:id/characters", getAnimeCharacters);
router.get("/:id/relations", getAnimeRelations);
router.get("/:id/recommendations", getAnimeRecommendations);
router.get("/:id/episodes", getEpisodes);
router.get("/watch/:provider/:anilistId/:category/:slug", getStream);
router.get("/:id", getAnimeInfo);

export default router;
