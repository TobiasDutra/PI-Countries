const { Activity } = require("../db");

const allActivities = async () => {
  const activities = await Activity.findAll();
  return activities;
};

module.exports = allActivities;
