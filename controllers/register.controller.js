const db = require("../db/index");
const bcrypt = require("bcrypt");
//Hay que ver lo del index dentro de el db

const registro = async (req, res) => {
  try {
    const mail = req.body.mail;
    const password = req.body.password;
    
 
    const user = await db.query(
      "select * from users where mail = $1",
      [mail]
    );

    if (user.rowCount > 0) {
      return res.status(400).json({
        data: [],
        message: "Ya existe usuario con ese correo",
        succes: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(password, salt);

    await db.query(
      "insert into users (mail, password) values ($1, $2)",
      [mail, passwordHashed]
    );

    return res
      .status(200)
      .json({ data: [], message: "registro", succes: true });
  } catch (error) {}
};


const login = async(req, res) => {
  try {
    
      const {mail, password} = req.body

      console.log(mail, password)
      
      const user = await db.query(`select * from users where mail = $1`, [mail])

      if (user.rowCount === 0) {
        return res.status(400).json({
          data: [],
          message: "El usuario no existe, registrate",
          succes: false,
        });
      }

      const validarContraseña = await bcrypt.compare(password, user.rows[0].password)

      if(!validarContraseña){
        return res.status(400).json({
          data: [],
          message: "Password inválido",
          succes: false,
        });
      }

      res.status(200).json({
          data : "Bienvenido"
      })
  } catch (error) {
      
  }
}

module.exports =  {registro, login} ;
