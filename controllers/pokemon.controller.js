const axios = require("axios");
const db = require("../db/index");

const getPokemon = async (req, res) => {

  try {
  
   const pokemons = await db.query("select * from pokemon");

    return res.status(200).json(pokemons.rows);
  } catch (error) {
    console.error(error);
  }
};

const getStats = async (req,res) => {
  try {
    
    const stast = await db.query("select * from stats")
    return res.status(200).json(stast.rows)

  } catch (error) {
    console.error(error)
  }
}

module.exports = { getPokemon, getStats };
