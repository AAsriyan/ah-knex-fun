const express = require("express");
const app = express();
const db = require("./config/knexConfig.js");
const hopesRoutes = require("./api/hopesRoutes.js");
const dreamsRoutes = require("./api/dreamsRoutes.js");

app.use(express.json());

app.use("/api/hopes", hopesRoutes);
app.use("/api/dreams", dreamsRoutes);

app.get("/", async (req, res) => {
  const results = await db("hopes");
  res.status(200).json(results);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}!`);
});
