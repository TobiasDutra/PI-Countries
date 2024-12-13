const { Router } = require("express");
const activityRouter = require("./activityRouter");
const countryRouter = require("./countryRouter");

//Routers
const router = Router();

//Config routers
router.use("/countries", countryRouter);
router.use("/activities", activityRouter);

module.exports = router;
