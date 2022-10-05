const express = require("express");
const app = express();
const pokemones = require("./routes/pokemon.route");
const cors = require("cors");
const registro = require("./routes/register.route");
const port = 3010;

app.use(express.json());
app.use(cors());

app.use("/pokemones", pokemones);
app.use("/registro", registro);

app.listen(port, () => {
  console.log("app lista ::", port);
});
