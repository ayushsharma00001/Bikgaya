const joi = require("joi");

module.exports.womenSchema = joi.object({
    product:joi.object({
        name:joi.string().required(),
        email:joi.string().required(),
        price:joi.number().required(),
        img:joi.string().allow("",null)
    }).required()
})




module.exports.menSchema = joi.object({
    product:joi.object({
        name:joi.string().required(),
        email:joi.string().required(),
        price:joi.number().required(),
        img:joi.string().allow("",null)
    }).required()
})