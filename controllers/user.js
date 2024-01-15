const Cart = require("../modals/cart");
const User = require("../modals/user");


module.exports.renderSignupPage = (req,res,next)=>{
    res.render("user/signup.ejs");
}

module.exports.signupUser = async (req,res,next)=>{
    try{
        let {username,password,email} = req.body;
        const newUser = new User({email:email,username:username});
        const registeredUser = await User.register(newUser,password);
        const registeredUserCart = new Cart({
            user:registeredUser._id
        });
        let registeredUserCartid = await registeredUserCart.save();
        registeredUser.cart = registeredUserCartid._id;
        await User.findByIdAndUpdate(registeredUser._id , registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
            else{
                req.flash("success","Welcome to Bikgaya");
                res.redirect("/");
            }
        })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginPage = (req,res,next)=>{
    res.render("user/login.ejs")
};



module.exports.loginUser = (req,res,next)=>{
    req.flash("success","Welcome back to bikgaya!");
    const redirectUrl = res.locals.redirectUrl  || "/";
    res.redirect(redirectUrl);
};


module.exports.logoutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        else{
            req.flash("success","You are logged out");
            res.redirect("/");
        }
    })
};


module.exports.editUser = async (req,res,next)=>{
    let {id} = req.params;
    let {access} = req.body
    let user = await User.findByIdAndUpdate(id,{access:access});
    req.flash("success","User Information Updated!");
    res.redirect("/dashboard/allUsers");
}