import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    animeId: { type: Number, required: true, index: true },
    animeTitle: { type: String, required: true },
    animePoster: { type: String, default: "" },
    animeBanner: { type: String, default: "" },
    score: { type: Number, default: null },
    format: { type: String, default: "" },
    status: { type: String, default: "" },
    year: { type: Number, default: null },
    genres: { type: [String], default: [] },
    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

favoriteSchema.index({ user: 1, animeId: 1 }, { unique: true });

export default mongoose.model("Favorite", favoriteSchema);
