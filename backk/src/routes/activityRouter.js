const { Router } = require("express");
const createActivity = require("../controllers/createActivity");
const allActivities = require("../controllers/allActivities");
const getCountries = require("../controllers/allCountries");
const { Country, Activity } = require("../db");

const activityRouter = Router();

activityRouter.post("/", async (req, res) => {
  try {
    const { name, id, difficulty, duration, season, countries } = req.body; // me llegan datos de req por body y los guardo
    const newActivity = await createActivity({
      name,
      id,
      difficulty,
      duration,
      season,
      countries,
    }); // uso la funcion con los datos y la guardo en newActivity
    res.status(201).json({
      created: "ok", // Informo con mensaje al cliente
      newActivity, // devuelvo actividad creada
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

activityRouter.get("/", async (req, res) => {
  try {
    const activities = await allActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = activityRouter;
