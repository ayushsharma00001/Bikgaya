const express = require("express");
const router = express.Router();

const Men = require("../modals/men");
const Women = require("../modals/women");
const Address = require("../modals/address");
const wrapAsync = require("../utility/wrapAsync");
const { isLoggedIn, isOwnerOfCartId } = require("../middleware");
const Cart = require("../modals/cart");
const User = require("../modals/user");
const addressController = require("../controllers/addresses");


// Render Edit page
router.get("/edit/address/:addressId/cart/:cartId",isOwnerOfCartId,wrapAsync(addressController.renderEditPageForAddress));


// Edit Address
router.put("/edit/address/:addressId/cart/:cartId",isOwnerOfCartId,wrapAsync(addressController.editAddress));


router.get("/address/:cartId",isLoggedIn,isOwnerOfCartId,wrapAsync(addressController.renderFormToCreateAddress));


router.post("/address/:cartId",isOwnerOfCartId,wrapAsync(addressController.createAddress));







module.exports = router
