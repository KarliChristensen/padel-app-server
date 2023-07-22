const express = require("express");
const router = express.Router();
const Game = require("../models/Game.model");

// Get all games

router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific game
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new game

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const game = await Game.create(req.body);
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a game
router.put("/:id", async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to update game" });
  }
});

// Delete a game

router.delete("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (game) {
      await game.remove();
      res.json({ message: "Game deleted" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
