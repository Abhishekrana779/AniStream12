import express from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getWatchlist,
  addWatchlist,
  removeWatchlist,
  getHistory,
  upsertHistory,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { validateAnimeId } from "../middleware/validate.js";

const router = express.Router();

router.use(authenticate);

router.get("/profile", (req, res) => {
  res.json({ success: true, data: req.user });
});

router.get("/favorites", getFavorites);
router.post("/favorites/:animeId", validateAnimeId, addFavorite);
router.delete("/favorites/:animeId", validateAnimeId, removeFavorite);

router.get("/watchlist", getWatchlist);
router.post("/watchlist/:animeId", validateAnimeId, addWatchlist);
router.delete("/watchlist/:animeId", validateAnimeId, removeWatchlist);

router.get("/history", getHistory);
router.post("/history", upsertHistory);

export default router;
