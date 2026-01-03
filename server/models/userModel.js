const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        username : {type: String, trim:true, require:true},
        email : {type: String, index:true, lowercase:true,  require:true},
        password : {type: String,  require:true},  //haspassword
        preference: {
            tone: { type: String, default: "neutral" },
            language: { type: String, default: "en" },
        },
        usercontext : {type:String, default: ""}
    },{
        timestamps: true, 
    }
)

userSchema.index({email:1})
module.exports = mongoose.model("User",userSchema );