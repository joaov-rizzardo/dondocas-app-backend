const e = require("express");
const providerModel = require("../models/provider.model.js");

exports.findAll = (req, res) => {
    providerModel.getAll((err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: 'An internal server error ocurred'
            })
            return
        }

        res.status(200).send(data)
    })
}

exports.create = (req, res) => {

    if(!req.body){
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty or has invalid value'
        })
    }

    const requiredFields = ['providerName', 'providerCategory']

    const requestFields = Object.entries(req.body)

    let stopCondition = false

    for(const requiredField of requiredFields){
        const searchedField = requestFields.find(requestField => {
            if(requestField[0] == requiredField){
                return requestField
            }
        })

        if(searchedField == undefined || searchedField[1] == ''){
            res.status(400).send({
                status: 'error',
                message: `The property ${requiredField} is not defined or has a invalid value`
            })
            stopCondition = true
            break
        }
    }

    if(stopCondition === true){
        return
    }

    providerModel.createProvider(req.body, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: 'An internal server error ocurred'
            })
            return
        }

        res.status(201).send({
            status: 'success',
            message: 'The provider has been created'
        })
    })
}

exports.update = (req, res) => {

    if(!req.body){
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty or has invalid value'
        })
    }

    const requiredFields = ['providerKey', 'providerName', 'providerCategory']

    const requestFields = Object.entries(req.body)

    let stopCondition = false

    for(const requiredField of requiredFields){
        const searchedField = requestFields.find(requestField => {
            if(requestField[0] == requiredField){
                return requestField
            }
        })

        if(searchedField == undefined || searchedField[1] == ''){
            res.status(400).send({
                status: 'error',
                message: `The property ${requiredField} is not defined or has a invalid value`
            })
            stopCondition = true
            break
        }
    }

    if(stopCondition === true){
        return
    }
    
    providerModel.updateProvider(req.body, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: 'An internal server error ocurred'
            })
            return
        }

        res.status(200).send({
            status: 'success',
            message: 'The provider has been updated'
        })
    })
}

exports.inactivate = (req, res) => {

    if(!req.body){
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty or has invalid value'
        })
    }

    const requiredFields = ['providerKey']

    const requestFields = Object.entries(req.body)

    let stopCondition = false

    for(const requiredField of requiredFields){
        const searchedField = requestFields.find(requestField => {
            if(requestField[0] == requiredField){
                return requestField
            }
        })

        if(searchedField == undefined || searchedField[1] == ''){
            res.status(400).send({
                status: 'error',
                message: `The property ${requiredField} is not defined or has a invalid value`
            })
            stopCondition = true
            break
        }
    }

    if(stopCondition === true){
        return
    }
    
    providerModel.inactivateProvider(req.body, (err, data) => {
        if(err){
            res.status(500).send({
                status: 'error',
                message: 'An internal server error ocurred'
            })
            return
        }

        res.status(200).send({
            status: 'success',
            message: 'The provider has been inactivated'
        })
    })
}

