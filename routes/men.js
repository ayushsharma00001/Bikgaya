const express = require("express");
const router = express.Router();
const Men = require("../modals/men.js");
const wrapAsync = require("../utility/wrapAsync.js");       // requiring wrapAsync function to handle errors
const {menSchema} = require("../Schema.js");              // Requiring for mongoose validation if we use any api caller tool for products
const {isLoggedIn, isOwnerOfMen, saveRedirectUrl, isAdmin} = require("../middleware.js");
const ExpressError = require("../utility/ExpressError.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const { allMenProductsMen, renderShowPageMen, renderEditFormMen, updateProductMen, deleteProductMen, } = require("../controllers/men.js");
const upload = multer({storage});





// Men section routes
router.get("/",wrapAsync(allMenProductsMen));


router.route("/:id")
.get(wrapAsync(renderShowPageMen))
.put(isLoggedIn,isAdmin,upload.single("product[img]"),wrapAsync(updateProductMen))
.delete(isLoggedIn,isAdmin,wrapAsync(deleteProductMen));


router.get("/:id/edit",isLoggedIn,isAdmin,wrapAsync(renderEditFormMen));


module.exports = router;


