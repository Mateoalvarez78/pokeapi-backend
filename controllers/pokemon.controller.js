const axios = require("axios");
const db = require("../db/index");

const getPokemon = async (req, res) => {

  try {

   const pokemons = await db.query("select * from pokemon p join moves m on p.id = m.id");

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

const agregarPokemon = async(req, res) => {

  try {
    
  
  const pokemonesData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.body.nombre}`)
  const pokemones = pokemonesData.data
  
  console.log(pokemones)

  let nombreEnBD = await db.query('select name from pokemon')
  let nombrePokemonABuscar = nombreEnBD.rows.find((poke) => {
    return poke.name === req.body.nombre
  })

  if(nombrePokemonABuscar) {
    res.json('Ya existe el pokemon')
  }
  else {
    let objetoPokemonAgregar = {
    cod : pokemones.id,
    name : pokemones.name,
    img : pokemones.sprites.other.home.front_default,
    tipo1 : pokemones.types[0].type.name,
    tipo2 : pokemones.types[1]? pokemones.types[1].type.name : null,
    weight : pokemones.weight,
    height : pokemones.height,
    move1 : pokemones.moves[0].move.name,
    move2 : pokemones.moves[1].move.name
  }

   let statsPokemon = {
    hp: pokemones.stats[0].base_stat,
    atk: pokemones.stats[1].base_stat,
    def: pokemones.stats[2].base_stat,
    satk: pokemones.stats[3].base_stat,
    sdef: pokemones.stats[4].base_stat,
    spd: pokemones.stats[5].base_stat,
  }; 
 
  await db.query(`insert into pokemon (cod, name, img, tipo1, tipo2, weight, height)
                              values ($1, $2, $3, $4, $5, $6, $7)`,
                              [objetoPokemonAgregar.cod, objetoPokemonAgregar.name, objetoPokemonAgregar.img, objetoPokemonAgregar.tipo1, objetoPokemonAgregar.tipo2, objetoPokemonAgregar.weight, objetoPokemonAgregar.height]
                              );

  await db.query(`insert into moves (move1, move2)
                              values ($1, $2)`,
                              [objetoPokemonAgregar.move1, objetoPokemonAgregar.move2]
                              );


  await db.query(
                  `insert into stats (hp, atk, def, satk, sdef, spd) 
                  values ($1, $2, $3, $4, $5, $6)`,
                  [statsPokemon.hp, statsPokemon.atk, statsPokemon.def, statsPokemon.satk, statsPokemon.sdef, statsPokemon.spd]
  );
    res.json(objetoPokemonAgregar)
  }
  }
  catch (error) {
    res.send(error).status(500)
  }

}
 


module.exports = { getPokemon, getStats, agregarPokemon };
