const subcategoryModel = require("../models/subcategory.model.js");

exports.findAll = (req, res) => {
    subcategoryModel.getAll((err, data) => {

        if (err) {
            req.status(400).send({
                status: 'error',
                message: 'Ocorreu um erro ao realizar a requisição'
            })
        }
        res.status(200).send(data)
    })
}

exports.findByKey = (req, res) => {
    subcategoryModel.getByKey(req.params.subcategoryKey, (err, data) => {
        if (err) {
            req.status(400).send({
                status: 'error',
                message: 'Ocorreu um erro ao realizar a requisição'
            })
        }
        res.status(200).send(data)
    })
}
