const Women = require("../modals/women");


module.exports.allProductsWomen = async (req,res)=>{
    let womens = await Women.find({});
    res.render("women/women",{womens});
}

module.exports.renderShowPageWomen = async (req,res)=>{
    let {id} = req.params;
    let data = await Women.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!data){
        req.flash("error","Product you requested for does not exist");
        res.redirect("/women");
    }
    else{
        res.render("women/show.ejs",{data});
    }
}


module.exports.renderEditPageWomen = async (req,res,next)=>{
    let{id} = req.params;
    let data = await Women.findById(id);
    res.render("women/edit.ejs",{data});

}

module.exports.updateProductWomen = async (req,res)=>{
    let{id} = req.params;
    let data = await Women.findByIdAndUpdate(id,{...req.body.product});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        data.img = {url,filename};
        await data.save();
    }
    req.flash("success","Product updated");
    res.redirect(`/women/${id}`);
}

module.exports.deleteProductWomen = async (req,res)=>{
    let{id} = req.params;
    let data = await Women.findByIdAndDelete(id);
    console.log(data);
    res.redirect("/women");
}