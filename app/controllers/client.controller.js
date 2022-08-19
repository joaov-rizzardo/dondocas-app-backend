const e = require("express");
const clientModel = require("../models/client.model.js");

exports.findByFields = (req, res) => {

    if (req.body?.client_name.length == 0 && req.body?.client_telephone.length == 0) {
        res.status(400).send({
            status: 'error',
            message: 'Required fields is not defined or has invalid value'
        })
        return
    }

    clientModel.getByFields(req.body?.client_name, req.body?.client_telephone, (err, data) => {
        if (err) {
            res.status(400).send({
                status: 'error',
                message: 'An error ocurred in request'
            })
            return
        }

        res.status(200).send(data)
    })

}

exports.create = (req, res) => {

    if (req.body?.client_name.length == 0 && req.body?.client_telephone.length == 0) {
        res.status(400).send({
            status: 'error',
            message: 'Required fields is not defined or has invalid value'
        })
        return
    }

    clientModel.createClient(req.body?.client_name, req.body?.client_telephone, (err, data) => {
        if (err) {
            res.status(400).send({
                status: 'error',
                message: 'An error ocurred in request'
            })
            return
        }

        res.status(200).send(data)
    })
}

exports.update = (req, res) => {
    
    if (!req.body?.client_key || (req.body?.client_name.length == 0 && req.body?.client_telephone.length == 0)) {
        res.status(400).send({
            status: 'error',
            message: 'Required fields is not defined or has invalid value'
        })
        return
    }

    clientModel.updateClient(req.body, (err, data) => {
        if (err) {
            res.status(400).send({
                status: 'error',
                message: 'An error ocurred in request'
            })
            return
        }

        res.status(200).send(data)
    })
}


