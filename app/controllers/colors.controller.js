const colorsModel = require("../models/colors.model.js");

exports.findAll = (req, res) => {
    colorsModel.getAll((err, data) => {

        if (err) {
            res.status(400).send({
                status: 'error',
                message: 'Ocorreu um erro ao realizar a requisição'
            })
            return
        }
        
        res.status(200).send(data)
    })
}


