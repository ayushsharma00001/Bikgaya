const mongoose = require("mongoose");
const Review = require("./review");
const Order = require("./orders");
let Schema = mongoose.Schema;

const menSchema = new Schema({
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

menSchema.post("findOneAndDelete",async (product)=>{
    if(product){
        await Review.deleteMany({_id:{$in:product.reviews}});
        let id = product._id;
        console.log(id);
        let order = await Order.find({});
        for(let od of order){
            for(let pd of od.mensProducts){
                if(pd.productId.equals(id)){
                    await Order.findByIdAndDelete(od._id);
                }
            }
        }
    }
});

const Men = mongoose.model("Men",menSchema);

module.exports = Men;