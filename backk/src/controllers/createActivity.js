const { Country, Activity } = require("../db");

const createActivity = async ({
  name,
  difficulty,
  duration,
  season,
  countries,
}) => {
  if (!name || !difficulty || !duration || !season || !countries)
    throw new Error("Faltan datos");

  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });

  let paises = await Country.findAll({
    where: {
      name: countries,
    },
  });

  console.log(paises);
  newActivity.addCountry(paises);
  return newActivity;
};

module.exports = createActivity;
