const Roles = require("../models/rolesModel");

const createRoles = async ()=>{
 const count = await Roles.estimatedDocumentCount();
       
 if (count==0){
 let rol1 = await new Roles({name: "user"}, {versionKey:false}).save()
 let rol2 = await new Roles({name: "admin"}, {versionKey:false}).save()
 let rol3 = await new Roles({name: "moderator"}, {versionKey:false}).save()
 }

}
module.exports = {createRoles}