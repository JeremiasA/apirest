const jwt = require('jsonwebtoken');
const Users = require("../models/usersModel");
const Roles = require("../models/rolesModel");
const JWTKey = require ('../config').JWTKey;




const verifyToken = async (req,res,next)=>{
  
  const token = req.headers["x-access-token"]
  // if(!token) return res.json({message: "No se ha envíado un token de seguridad"})
  
  try {
    const decoded = jwt.verify(token, JWTKey);
    req.userId =  decoded.data.id;
  } catch (error) {
    return res.status(404).json({message: "Error de seguridad, vuelva a iniciar sesión", error})
  }

  //buscar usuario a traves del id proporcionado por el token
  error=null
  const user = await Users.findById(req.userId)
    .catch(err => {error = err})
    if(error) return res.json({message: "Error en la consulta a la base de datos", error})
    else{
      if(!user) return res.json({message: "Usuario inexistente"})
    }
    next() 
}

module.exports = {verifyToken}
