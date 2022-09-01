const e = require("express");
const categoryModel = require("../models/category.model.js");

exports.findAll = (req, res) => {
    categoryModel.getAll((err, data) => {

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

exports.findByKey = (req, res) => {
    categoryModel.getByKey(req.params.categoryKey, (err, data) => {
        
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

