const Men = require("../modals/men.js");
const Women = require("../modals/women.js");


module.exports.renderNewProductForm = async(req,res,next)=>{
    res.render("newProduct/new");
};


module.exports.addNewProduct = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let {category} = req.body;
    if(category == "men"){
        let addedProduct = new Men(req.body.product);
        addedProduct.owner = "658bc2f21a518af159fb1ded"
        addedProduct.img = {url,filename};
        await addedProduct.save();
    }
    else if(category == "women"){
        let addedProduct = new Women(req.body.product);
        addedProduct.owner = "658bc2f21a518af159fb1ded"
        addedProduct.img = {url,filename};
        await addedProduct.save();
    }
    req.flash("succes","New product added");
    res.redirect(`/${category}`);
};