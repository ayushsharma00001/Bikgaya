const express = require("express");
const router = express.Router();
const Cart = require("../modals/cart");
const wrapAsync = require("../utility/wrapAsync");
const Men = require("../modals/men");
const Women = require("../modals/women");
const { isLoggedIn, isCartOwner, isOutOfStock } = require("../middleware");
const User = require("../modals/user");

router.get("/section/:userId",isLoggedIn,isCartOwner,wrapAsync(async (req,res,next)=>{
  let {userId} = req.params;
  let user = await User.findById(userId);
  let cart = await Cart.findById(user.cart).populate("mensProduct").populate("womensProduct");
  res.render("cart/cart.ejs",{cart});
}));

router.get(
  "/:id",isLoggedIn,isOutOfStock,
  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let product = await Men.findById(id);
    if(!product){
        let cart = await Cart.findById(req.user.cart);
        cart.womensProduct.push(id);
        cart = await Cart.findByIdAndUpdate(req.user.cart ,cart );
        req.flash("success","Item added to cart");
        res.redirect(`/women/${id}`);
    }
    else{
      let cart = await Cart.findById(req.user.cart);
      cart.mensProduct.push(id);
      cart = await Cart.findByIdAndUpdate(req.user.cart ,cart );
        req.flash("success","Item added to cart");
        res.redirect(`/men/${id}`);
    }
  }
));

router.delete("/:cartId/item/:itemId",wrapAsync(async(req,res,next)=>{
  let {cartId , itemId} = req.params;
  let product = await Men.findById(itemId);
  if(!product){
    let cart = await Cart.findByIdAndUpdate(cartId,{$pull:{womensProduct: itemId }});
    res.redirect(`/cart/section/${req.user._id}`);
  }
  else{
    let cart = await Cart.findByIdAndUpdate(cartId,{$pull:{mensProduct: itemId }});
    res.redirect(`/cart/section/${req.user._id}`);
  }
}))



module.exports = router;
