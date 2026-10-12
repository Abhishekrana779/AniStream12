import mongoose from "mongoose";

const watchHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    animeId: { type: Number, required: true, index: true },
    animeTitle: { type: String, required: true },
    animePoster: { type: String, default: "" },
    episodeId: { type: String, required: true },
    episodeNumber: { type: Number, required: true },
    provider: { type: String, default: "" },
    progress: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    watchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

watchHistorySchema.index({ user: 1, animeId: 1, episodeId: 1 }, { unique: true });

export default mongoose.model("WatchHistory", watchHistorySchema);
