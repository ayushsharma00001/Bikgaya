const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    access:{
        type:String,
        default:"customer",
    },
    address:{
        type:Schema.Types.ObjectId,
        ref:"Address"
    },
    cart:{
        type:Schema.Types.ObjectId,
        ref:"Cart",
    },
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order",
            _id:false
        }
    ],
});


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User",userSchema);

module.exports = User;

