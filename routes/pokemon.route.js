const express = require("express");
const router = express.Router();
const cors = require("cors")
const {getPokemon, getStats, agregarPokemon} = require("../controllers/pokemon.controller");
const {registro, login} = require('../controllers/register.controller')



router.use(cors())
router.use(express.json())

router.get('/',getPokemon, ) 
router.get('/stats', getStats)
router.post('/agregarPokemon', agregarPokemon )
router.post("/registro", registro);
router.post('/login', login)



module.exports = router