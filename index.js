import express from "express";

const app = express();
app.use(express.json());

// Secure gateway key (set in Render environment variables)
const API_KEY = "test123";

// Health check route
app.get("/", (req, res) => {
  res.send("Optonomic AI Gateway is running");
});

// Main AI endpoint
app.post("/chat", async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth || auth !== `Bearer test123`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "Missing input" });
  }

  // Temporary dual-model logic (we will upgrade to real AI later)
  const modelA = `Model A: ${input}`;
  const modelB = `Model B (expanded): ${input} — with added structure and examples`;

  res.json({
    a: modelA,
    b: modelB
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
