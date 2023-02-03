const e = require("express");
const movementModel = require("../models/movement.model.js");

exports.findLastMovements = (req, res) => {
    movementModel.getLastMovements((err, data) => {

        if(err){
            res.status(400).send({
                status: 'error',
                message: 'Ocorreu um erro ao realizar a requisição'
            })
            return
        }

        res.status(200).send(data)
    })
}