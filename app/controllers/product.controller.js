const productModel = require("../models/subcategory.model.js");

exports.create = (req, res) => {

    const requestKeys = Object.keys(req.body)
    
    if(!requestKeys.length){
        res.status(400).send({
            status: 'error',
            message: 'The body content is empty'
        })
        return
    }
    
    if(!req.body.productCode){
        res.status(400).send({
            status: 'error',
            message: 'The property productCode has a invalid value'
        }) 
    }
    console.log(requestKeys)

}
