const paymentModel = require("../models/payment.model.js");

exports.findAll = (req, res) => {
    paymentModel.getAll((err, data) => {

        if (err) {
            req.status(400).send({
                status: 'error',
                message: 'Ocorreu um erro ao realizar a requisição'
            })
            return
        }
        
        res.status(200).send(data)
    })
}


