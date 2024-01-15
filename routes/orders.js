const express = require("express");
const router = express.Router();

const Address = require("../modals/address");
const Cart = require("../modals/cart");
const Men = require("../modals/men");
const Order = require("../modals/orders");
const Women = require("../modals/women");
const wrapAsync = require("../utility/wrapAsync");
const { isLoggedIn, isOwnerOfCartId, orderPlaced } = require("../middleware");
const User = require("../modals/user");


router.get("/order/:orderId/placed",isLoggedIn,orderPlaced,wrapAsync(async (req,res,next)=>{
    res.render("Orders/orderPlaced.ejs");
}));

router.get("/order/:cartId/:addressId",isLoggedIn,isOwnerOfCartId,wrapAsync(async(req,res,next)=>{
    let {cartId , addressId} = req.params;
    let cart = await Cart.findById(cartId).populate("mensProduct").populate("womensProduct");
    let address = await Address.findById(addressId);
    res.render("Orders/order.ejs",{cart , address});
}));
router.post("/order/:cartId/:addressId",isOwnerOfCartId,wrapAsync(async(req,res,next)=>{
    let {cartId , addressId} = req.params;
    let {totalprice} = req.body;
    let cart = await Cart.findById(cartId);
    let address = await Address.findById(addressId);
    let user = await User.findById(req.user._id);
    let order = new Order({
        userId:req.user._id,
        addressId:address._id,
        totalprice:totalprice
    },{new:false});
    for(let product of cart.mensProduct){
        order.mensProducts.push({productId:product});
        let menP = await Men.findById(product);
        let stock = menP.stock-1;
        await Men.findByIdAndUpdate(product,{stock:stock});
    }
    for(let product of cart.womensProduct){
        order.womensProducts.push({productId:product});
        let womenP = await Women.findById(product);
        let stock = womenP.stock-1;
        await Women.findByIdAndUpdate(product,{stock:stock});

    }
    await Cart.findByIdAndUpdate(cartId,{$set:{womensProduct: [] }});
    await Cart.findByIdAndUpdate(cartId,{$set:{mensProduct: [] }});
    order = await order.save();
    user.orders.push(order);
    await user.save();
    res.redirect(`/order/${order._id}/placed`);
}));

router.get("/myOrders/:userId",isLoggedIn,wrapAsync(async (req,res,next)=>{
    let {userId} = req.params;
    let user = await User.findById(userId).populate({path:"orders",populate:{path:"mensProducts.productId"}}).populate({path:"orders",populate:{path:"womensProducts.productId"}});
    res.render("Orders/myOrders.ejs",{user});
}))




module.exports = router;
