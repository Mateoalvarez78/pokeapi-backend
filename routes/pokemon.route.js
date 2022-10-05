const express = require("express");
const router = express.Router();
const cors = require("cors")
const {getPokemon, getStats, agregarPokemon} = require("../controllers/pokemon.controller");


router.use(cors())
router.use(express.json())

router.get('/',getPokemon, ) 
router.get('/stats', getStats)
router.post('/agregarPokemon', agregarPokemon )



module.exports = router