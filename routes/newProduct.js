const express = require("express");
const wrapAsync = require("../utility/wrapAsync");
const router = express.Router();
const Men = require("../modals/men.js");
const Women = require("../modals/women.js");
const { isOwner, isAdmin } = require("../middleware.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const { renderNewProductForm, addNewProduct } = require("../controllers/newProduct.js");
const upload = multer({storage});



router.get("/add",isAdmin,wrapAsync(renderNewProductForm));



router.post("/add",upload.single("product[img]"),isAdmin,wrapAsync(addNewProduct));

module.exports = router;