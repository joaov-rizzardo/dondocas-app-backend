const e = require("express");
const expenseModel = require("../models/expense.model.js");

exports.findAllCategory = (req, res) => {
    expenseModel.getAllCategory((err, data) => {
        if (err) {
            res.status(500).send({
                status: 'error',
                message: 'An internal error ocurrend in request'
            })
            return
        }

        res.status(200).send(data)
    })
}

exports.createCategory = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty'
        })
        return
    }

    if (!req.body.categoryDescription) {
        res.status(400).send({
            status: 'error',
            message: 'The property categoryDescription is not defined or has a invalid value'
        })
        return
    }

    if (req.body.categoryDescription.length > 15) {
        res.status(400).send({
            status: 'error',
            message: 'The property categoryDescription exceeds limit of 15 caracters'
        })
        return
    }

    expenseModel.createCategory(req.body.categoryDescription, (err, data) => {
        if (err) {
            res.status(500).send({
                status: 'error',
                message: 'An internal error ocurrend in request'
            })
            return
        }

        res.status(201).send({
            status: 'success',
            message: 'The expense category has been created'
        })
    })
}

exports.findExpenses = (req, res) => {
    const month = req.params.month ?? false
    const year = req.params.year ?? false
    expenseModel.getExpenses((err, data) => {
        if (err) {
            console.log(err)
            res.status(500).send({
                status: 'error',
                message: 'An internal error ocurrend in request'
            })
            return
        }

        res.status(200).send(data)
    }, year, month)
}

exports.createExpense = (req, res) => {

    if(!req.body){
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty'
        })
        return
    }

    const requiredFields = ['expenseDescription', 'categoryKey', 'expenseValue']

    const requestedBody = Object.entries(req.body)

    let stopCondition = false

    for(field of requiredFields){
        const searchedField = requestedBody.find(bodyField => {
            if(bodyField[0] == field){
                return bodyField
            }
        })

        
        if(!searchedField || searchedField[1].length == 0){
                
        }
    }

}

