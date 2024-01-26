const Address = require("../modals/address.js");
const Cart = require("../modals/cart");
const User = require("../modals/user");
const Men = require("../modals/men");
const Women = require("../modals/women");


module.exports.renderEditPageForAddress = async (req,res,next)=>{
    let {addressId,cartId} = req.params;
    let address = await Address.findById(addressId);
    let cart = await Cart.findById(cartId);
    res.render("Addresses/edit.ejs",{address,cart});
};


module.exports.editAddress = async (req,res,next)=>{
    let {addressId,cartId} = req.params;
    let address = await Address.findByIdAndUpdate(addressId,{...req.body.address});
    req.flash("succes","Address Updated");
    res.redirect(`/address/${cartId}`);
};


module.exports.renderFormToCreateAddress = async (req,res,next)=>{
    let {cartId} = req.params;
    let user = await User.findById(req.user._id).populate("address");
    let address = await Address.findById(user.address);
    let cart = await Cart.findById(cartId);
    res.render("Addresses/form.ejs",{cart,user,address});

};

module.exports.createAddress = async (req,res,next)=>{
    let {cartId} = req.params;
    let newAddress = new Address(req.body.address);
    let user = await User.findById(req.user._id)
    newAddress.userId = req.user._id;
    newAddress = await newAddress.save();
    user = await User.findByIdAndUpdate(user._id ,{$set:{address:newAddress._id}} );

    res.redirect(`/order/${cartId}/${newAddress._id}`);

};