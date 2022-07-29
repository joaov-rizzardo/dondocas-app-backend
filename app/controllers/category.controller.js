const e = require("express");
const categoryModel = require("../models/category.model.js");

exports.findAll = (req, res) => {
    categoryModel.getAll((err, data) => {

        if(err){
            req.status(400).send({
                status: 'error',
                message: 'Ocorreu um erro ao realizar a requisição'
            })
            return
        }

        if(!data.length){
            res.status(404).send({
                status: 'error',
                message: 'Product data not found'
            })
            return
        }

        res.status(200).send(data)
    })
}

exports.findByKey = (req, res) => {
    categoryModel.getByKey(req.params.categoryKey, (err, data) => {
        
        if(err){
            req.status(400).send({
                status: 'error',
                message: 'Ocorreu um erro ao realizar a requisição'
            })
            return
        }

        if(!data.length){
            res.status(404).send({
                status: 'error',
                message: 'Product data not found'
            })
            return
        }

        res.status(200).send(data)
    })
}

