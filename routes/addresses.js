const express = require("express");
const router = express.Router();

const Men = require("../modals/men");
const Women = require("../modals/women");
const Address = require("../modals/address");
const wrapAsync = require("../utility/wrapAsync");
const { isLoggedIn, isOwnerOfCartId } = require("../middleware");
const Cart = require("../modals/cart");
const User = require("../modals/user");


// Render Edit page
router.get("/edit/address/:addressId/cart/:cartId",isOwnerOfCartId,wrapAsync(async (req,res,next)=>{
    let {addressId,cartId} = req.params;
    let address = await Address.findById(addressId);
    let cart = await Cart.findById(cartId);
    res.render("Addresses/edit.ejs",{address,cart});
}));


// Edit Address
router.put("/edit/address/:addressId/cart/:cartId",isOwnerOfCartId,wrapAsync(async (req,res,next)=>{
    let {addressId,cartId} = req.params;
    let address = await Address.findByIdAndUpdate(addressId,{...req.body.address});
    req.flash("succes","Address Updated");
    res.redirect(`/address/${cartId}`);
}));


router.get("/address/:cartId",isLoggedIn,isOwnerOfCartId,wrapAsync(async (req,res,next)=>{
    let {cartId} = req.params;
    let user = await User.findById(req.user._id).populate("address");
    let address = await Address.findById(user.address);
    let cart = await Cart.findById(cartId);
    res.render("Addresses/form.ejs",{cart,user,address});

}));


router.post("/address/:cartId",isOwnerOfCartId,wrapAsync(async (req,res,next)=>{
    let {cartId} = req.params;
    let newAddress = new Address(req.body.address);
    let user = await User.findById(req.user._id)
    newAddress.userId = req.user._id;
    newAddress = await newAddress.save();
    user = await User.findByIdAndUpdate(user._id ,{$set:{address:newAddress._id}} );

    res.redirect(`/order/${cartId}/${newAddress._id}`);

}));







module.exports = router
