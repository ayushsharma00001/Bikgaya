const express = require("express");
const router = express.Router();
const Women = require("../modals/women.js");
const wrapAsync = require("../utility/wrapAsync.js");       // requiring wrapAsync function to handle errors
const {womenSchema} = require("../Schema.js");              // Requiring for mongoose validation if we use any api caller tool for products
const { isLoggedIn, isOwnerOfWomen, isAdmin } = require("../middleware.js");

const multer = require("multer")
const {storage} = require("../cloudConfig.js");
const { allProductsWomen, renderShowPageWomen, renderEditPageWomen, updateProductWomen, deleteProductWomen } = require("../controllers/women.js");
const upload = multer({storage});




// Women section routes
router.get("/",wrapAsync(allProductsWomen));

router.route("/:id")
.get(wrapAsync(renderShowPageWomen))
.put(isLoggedIn,isAdmin,upload.single("product[img]"),wrapAsync(updateProductWomen))
.delete(isLoggedIn,isAdmin,wrapAsync(deleteProductWomen));

router.get("/:id/edit",isLoggedIn,isAdmin,wrapAsync( renderEditPageWomen));


module.exports = router;


