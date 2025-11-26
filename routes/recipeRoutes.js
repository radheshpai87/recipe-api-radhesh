const express = require("express");
const path = require("path");
const fs = require("fs");
const { findPackageJSON } = require("module");
const { diff } = require("util");

const app = express();
app.use(express.json());

const filePath = path.join(__dirname, "../data/recipe.json");

const readFile = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeFile = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    return false;
  }
};

app.post("/", (req, res) => {
  const { title, ingredients, instructions, cookTime, difficulty } = req.body;
  if(!title || !ingredients || !instructions || !cookTime) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newRecipe = { id: Date.now().toString(), title, ingredients, instructions, difficulty: difficulty || "medium", cookTime };
  const recipes = readFile();
  recipes.push(newRecipe);
  const success = writeFile(recipes);
  if (success) {
    res.status(201).json({ message: "Recipe added successfully" });
  } else {
    res.status(500).json({ message: "Failed to add recipe" });
  }
});

app.get("/", (req, res) => {
  const recipes = readFile();
  res.json(recipes);
});

module.exports = app;
