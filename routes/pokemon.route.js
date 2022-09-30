const express = require("express");
const router = express.Router();
const cors = require("cors")
const {getPokemon, getStats} = require("../controllers/pokemon.controller");

router.use(cors())

router.get('/',getPokemon, ) 
router.get('/stats', getStats)


module.exports = router