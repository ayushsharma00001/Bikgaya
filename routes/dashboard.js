const express = require("express");
const wrapAsync = require("../utility/wrapAsync");
const router = express.Router();
const Men = require("../modals/men");
const Women = require("../modals/women");
const User = require("../modals/user");
const { isAdmin, isLoggedIn } = require("../middleware");
const Order = require("../modals/orders");



router.get("/",isLoggedIn,isAdmin,wrapAsync(async (req,res,next)=>{
    let orders = await Order.find({}).populate("mensProducts.productId").populate("womensProducts.productId").populate("userId").populate("addressId");
    // console.log(orders);
    // res.send(orders)
    res.render("dashboard/dashboard.ejs",{orders});
}));
router.get("/allProducts",isLoggedIn,isAdmin,wrapAsync(async (req,res,next)=>{
    let menData = await Men.find({});
    let womenData = await Women.find({});
    res.render("dashboard/allProducts.ejs",{menData , womenData});
}));
router.get("/allUsers",isLoggedIn,isAdmin,wrapAsync(async (req,res,next)=>{
    let usersData = await User.find({});
    res.render("dashboard/allUsers.ejs",{usersData});
}));

router.get("/:orderId",isLoggedIn,isAdmin,wrapAsync(async (req,res,next)=>{
    let {orderId} = req.params;
    let order = await Order.findById(orderId).populate("mensProducts.productId").populate("womensProducts.productId").populate("userId").populate("addressId");
    res.render("dashboard/singleOrder.ejs",{order});
}));

router.put("/:orderId",isAdmin,wrapAsync(async (req,res,next)=>{
    let {orderId} = req.params;
    let order = await Order.findByIdAndUpdate(orderId,{...req.body.order});
    res.redirect(`/dashboard/${orderId}`)

}));

module.exports = router;
