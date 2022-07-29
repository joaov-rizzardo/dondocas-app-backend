const productModel = require("../models/product.model.js");

exports.create = (req, res) => {

    const requestKeyValues = Object.entries(req.body)

    // VERIFICA SE A REQUEST POSSUI UM BODY
    if (!requestKeyValues.length) {
        res.status(400).send({
            status: 'error',
            message: 'The body content is empty'
        })
        return
    }

    // CAMPOS QUE SÃO OBRIGATÓRIO VIR NO BODY
    const requiredFields = [
        'productCode',
        'productDescription',
        'categoryKey',
        'subcategoryKey',
        'productCashPaymentValue',
        'productDeferredPaymentValue',
        'productPurchaseValue'
    ]

    // REALIZANDO VALIDAÇÃO DOS CAMPOS OBRIGATÓRIOS
    const invalidField = requiredFields.find(field => {

        const property = requestKeyValues.find(element => {
            if (element[0] == field) return element
        })

        if (!property || property[1] == '') {
            return field;
        }
    })

    if (invalidField) {
        res.status(400).send({
            status: 'error',
            message: `The property ${invalidField} is empty or not defined`
        })
        return
    }

    productModel.createProduct(req.body, (err, status) => {
        if (err) {
            console.log(err)
            res.status(400).send({
                status: 'error',
                message: 'An error ocurred in the request'
            })
            return
        }

        if(status){
            res.status(201).send({
                status: "success",
                message: "Product has been created successfully"
            })
        }
        
    })
}

exports.findAll = (req, res) => {
    productModel.getAll((err, data) => {
        if(err){
            res.status(400).send({
                status: 'error',
                message: 'An error ocurred in the request'
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

exports.findByCode = (req, res) => {
    productModel.getByCode(req.params.productCode, (err, data) => {
        if(err){
            res.status(400).send({
                status : 'error',
                message: 'An error ocurred in the request'
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