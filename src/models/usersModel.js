const mongoose = require ('mongoose');
const {Schema} = require ('mongoose');
const bcrypt = require ('bcrypt');

const UsersSchema = new Schema({
    username: {
        type:String,
        unique: true
    },
    email: {
        type:String,
        unique: true
    },
    password:{
        type : String
    },
    roles:[{
        ref:"roles",
        type: Schema.Types.ObjectId
    }]
    }, {
        timestamps:true,
        versionKey:false
        
    });



    module.exports = UsersSchema.statics.encryptPass = async (password) =>{
        return await bcrypt.hash(password, 10)
    }
   
    module.exports = UsersSchema.statics.desencryptPass = async (receivedPass, hash) =>{
        return await bcrypt.compare(receivedPass, hash);
    }

    module.exports = mongoose.model("users", UsersSchema)