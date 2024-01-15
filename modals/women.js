const mongoose = require("mongoose");
const Review = require("./review");
const Order = require("./orders");
let Schema = mongoose.Schema;

const womenSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    img:{
        url:String,
        filename:String
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    stock:{
        type:Number,
        min:0,
        required:true
    }
});


womenSchema.post("findOneAndDelete",async (product)=>{
    if(product){
        await Review.deleteMany({_id:{$in:product.reviews}});
        let id = product._id;
        let order = await Order.find({});
        for(let od of order){
            for(let pd of od.womensProducts){
                if(pd.productId.equals(id)){
                    await Order.findByIdAndDelete(od._id);
                }
            }
        }
    }
})

const Women = mongoose.model("Women",womenSchema);

module.exports = Women;
