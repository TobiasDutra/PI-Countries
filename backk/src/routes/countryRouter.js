const { Router } = require("express");
const getCountries = require("../controllers/allCountries");

const countryRouter = Router();

countryRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const countries = await getCountries(); // fucion de controller con await para esperar a que tenga data para guardarlo
    if (name) {
      // console.log(name);
      // console.log(countries[1].dataValues.name);
      const country = countries.find(
        (country) => country.name.toLowerCase() === name.toLowerCase()
      );
      if (country) {
        return res.status(200).json([country]);
      } else {
        return res.status(400).send("No existe el pais :(");
      }
    }
    res.status(200).json(countries); // respondo con countries
  } catch (error) {
    res.status(500).json({ error: error.message }); // respondo un json por si hay error
  }
});

countryRouter.get("/:idPais", async (req, res) => {
  try {
    const { idPais } = req.params;
    // console.log(idPais, typeof idPais);
    const countries = await getCountries(); // fucion de controller con await para esperar a que tenga data para guardarlo
    if (idPais) {
      const country = countries.find((country) => country.id === idPais);
      // console.log(countries);
      // console.log(country);
      if (country) {
        return res.status(200).json(country);
      } else {
        return res.status(400).send("No existe el pais con ese id :(");
      }
    }
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// error al mandar mal escrito

countryRouter.get("*", async (req, res) => {
  res.send("La ruta con esta url no existe");
});

module.exports = countryRouter;
