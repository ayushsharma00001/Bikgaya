const Men = require("../modals/men");



module.exports.allMenProductsMen = async (req,res,next)=>{
    let mens = await Men.find({});
    res.render("men/men.ejs",{mens});
};


module.exports.renderShowPageMen = async (req,res,next)=>{
    let {id} = req.params;
    let data = await Men.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!data){
        req.flash("error","Product you requested for does not exist");
        res.redirect("/men");
    }
    else{
    res.render("men/show.ejs",{data});
    }
};


module.exports.renderEditFormMen =  async (req,res,next)=>{
    let{id} = req.params;
    let data = await Men.findById(id);
    res.render("men/edit.ejs",{data});

};

module.exports.updateProductMen = async (req,res)=>{
    let{id} = req.params;
    let data = await Men.findByIdAndUpdate(id,{...req.body.product});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        data.img = {url,filename};
        await data.save();
    }
    req.flash("success","Product updated");
    res.redirect(`/men/${id}`);
}

module.exports.deleteProductMen = async (req,res,next)=>{
    let{id} = req.params;
    let data = await Men.findByIdAndDelete(id);
    req.flash("success","Product deleted");
    // console.log(data);
    res.redirect("/men");
}