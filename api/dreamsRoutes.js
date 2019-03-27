const express = require("express");
const router = express.Router();
const db = require("../config/knexConfig.js");

router.get("/", async (req, res) => {
  try {
    const result = await db("dreams");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const { title, description } = body;
  if (!title && !description) {
    return res.status(400).json({ message: "You is bad request." });
  }

  try {
    const results = await db("dreams")
      .where({ id })
      .update(body);

    results === 1
      ? res.status(200).json(results)
      : res.status(404).json({ message: "not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
