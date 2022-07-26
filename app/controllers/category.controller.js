const categoryModel = require("../models/category.model.js");

exports.findAll = (req, res) => {
    categoryModel.getAll((err, data) => {

        if(err){
            req.status(400).send({
                status: 'error',
                message: 'Ocorreu um erro ao realizar a requisição'
            })
        }
        res.status(200).send(data)
    })


}
