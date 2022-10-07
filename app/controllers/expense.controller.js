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
            res.status(200).send({
                status: 'error',
                message: `The property ${field} is not defined or has invalid value`
            })
            stopCondition = true
            return false
        }
    }

    if(stopCondition === true){
        return
    }

    expenseModel.createExpense(req.body, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: 'An internal error ocurred in the request'
            })
            return
        }

        res.status(201).send({
            status: 'success',
            message: 'The expense has been created'
        })
    })
}

exports.updateExpense = (req, res) => {
    if(!req.body){
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty'
        })
        return
    }

    const requiredFields = ['expenseKey', 'expenseDescription', 'categoryKey', 'expenseValue']

    const requestedBody = Object.entries(req.body)

    let stopCondition = false

    for(field of requiredFields){
        const searchedField = requestedBody.find(bodyField => {
            if(bodyField[0] == field){
                return bodyField
            }
        })
        
        if(!searchedField || searchedField[1].length == 0){
            res.status(200).send({
                status: 'error',
                message: `The property ${field} is not defined or has invalid value`
            })
            stopCondition = true
            return false
        }
    }

    if(stopCondition === true){
        return
    }

    expenseModel.updateExpense(req.body, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: 'An internal error ocurred in the request'
            })
            return
        }

        res.status(200).send({
            status: 'success',
            message: 'The expense has been updated'
        })
    })
}

exports.inactivateExpense = (req, res) => {
    expenseModel.inactivateExpense(req.params.expenseKey, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: 'An internal error ocurred in the request'
            })
            return
        }

        res.status(200).send({
            status: 'success',
            message: 'The expense has been inactivated'
        })
    })
}

exports.getTotalExpensesByMonth = (req, res) => {

    console.log(req)
    expenseModel.findTotalExpensesByMonth(req.params.year, req.params.month, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: 'An internal error ocurred in the request'
            })
            return
        }
        
        res.status(200).send(data[0])
    })
}

exports.getAmountByCategory = (req, res) => {

    let params = {
        year: '',
        month: '',
        startDate: '',
        finishDate: ''
    }

    // VALIDAÇÃO APENAS QUANDO FOR UMA REQUISIÇÃO POST
    if(req.method == 'POST'){
        if(!req.body){
            res.status(400).send({
                status: 'error',
                message: 'The content body is invalid or has a invalid value'
            })
            return
        }

        if(req.body.startDate == undefined || req.body.startDate == '' || req.body.finishDate == '' || req.body.finishDate == undefined){
            res.status(400).send({
                status: 'error',
                message: 'The required field is not defined or has a invalid value'
            })
            return
        }

        params.startDate = req.body.startDate
        params.finishDate = req.body.finishDate
    }

    if(req.params.year && req.params.month){
        params.year = req.params.year
        params.month = req.params.month
    }

    expenseModel.findAmountByCategory(params, (err, data) => {
        if(err){
            console.log(err)
            res.status(500).send({
                status: 'error',
                message: 'An internal error ocurred in the request'
            })
            return
        }
        res.status(200).send(data)
    })
}

