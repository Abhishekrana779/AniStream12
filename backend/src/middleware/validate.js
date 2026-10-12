export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: "Name must be at least 2 characters" });
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Valid email is required" });
  }
  if (!password || typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ success: false, message: "Email is required" });
  }
  if (!password || typeof password !== "string") {
    return res.status(400).json({ success: false, message: "Password is required" });
  }
  next();
};

export const validateAnimeId = (req, res, next) => {
  const { id } = req.params;
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, message: "Invalid anime ID" });
  }
  next();
};
