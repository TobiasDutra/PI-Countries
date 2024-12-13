const axios = require("axios");
const { API_KEY } = process.env;
const { Country, Activity } = require("../db");

// const apiCountries = async () => {
//   try {
//     const respuesta = await axios.get(`http://localhost:5000/countries`);
//     const info = respuesta.data.map((countrie) => {
//       return {
//         idd: countrie.idd.root,
//         name: countrie.name.common,
//         flags: countrie.flags.png,
//         continents: countrie.continents,
//         capital: countrie.capital,
//         subregion: countrie.subregion,
//         area: countrie.area,
//         population: countrie.population,
//       };
//     });
//     return info;
//   } catch (e) {
//     console.log(e);
//   }
// };

// const dbCountries = async () => {
//   const countries = await Country.findAll({
//     include: {
//       model: Activity,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
//   return countries;
// };

// const allCountries = async () => {
//   const api = await apiCountries();
//   const db = await dbCountries();
//   const allData = api.concat(db);
//   return allData;
// };

//----------------------------------------

const getCountries = async () => {
  const response = await axios.get("http://localhost:5000/countries");
  const dataPaises = response.data;

  for (const country of dataPaises) {
    if (country.cca3 && country.name.common) {
      await Country.findOrCreate({
        where: { id: country.cca3 },
        defaults: {
          name: country.name.common,
          flagImage: country.flags.png,
          continent: country.continents[0],
          capital:
            country.capital && country.capital.length > 0
              ? country.capital[0]
              : null,
          subregion: country.subregion,
          area: country.area,
          population: country.population,
        },
      });
    }
  }
  const countries = await Country.findAll({
    include: {
      model: Activity,
      attributes: ["id", "name"],
      through: {
        attributes: [],
      },
    },
  });
  return countries;
};

module.exports = getCountries;
