const Users = require("../models/usersModel");
const Roles = require("../models/rolesModel");

const isAdmin = async (req,res,next)=>{
  
    const user = await Users.findById(req.userId)
    const rols = await Roles.find({_id : {$in: user.roles}})
    for (const i of rols) {
       if (i.name === "admin"){
         next();
         return;
       }  
    }
    return res.status(403).json({message : 'Require Admin role'})
  
  }

  const isModerator = async (req,res,next)=>{
  
    const user = await Users.findById(req.userId)
    const rols = await Roles.find({_id : {$in: user.roles}})
    for (const i of rols) {
       if (i.name === "moderator"){
         next();
         return;
       }  
    }
    return res.status(403).json({message : 'Require Moderator role'})
  
  }

  module.exports = {isAdmin, isModerator}