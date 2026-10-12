import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    animeId: { type: Number, required: true, index: true },
    animeTitle: { type: String, required: true },
    animePoster: { type: String, default: "" },
    animeBanner: { type: String, default: "" },
    status: { type: String, default: "plan_to_watch" },
    progress: { type: Number, default: 0 },
    totalEpisodes: { type: Number, default: null },
    addedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

watchlistSchema.index({ user: 1, animeId: 1 }, { unique: true });

export default mongoose.model("Watchlist", watchlistSchema);
