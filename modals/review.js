const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()   
    },
    message:{
        type:String,
        required:true
    },
    author:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});

const Review = mongoose.model("Review",reviewSchema);

module.exports = Review;