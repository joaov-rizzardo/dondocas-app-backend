const e = require("express");
const saleModel = require("../models/sale.model.js");

const validateProductPayload = payload => {
    payload = Object.entries(payload)
    // CAMPOS OBRIGATÓRIOS NA ESTRUTURA DE PRODUTOS
    const requiredProductsFields = [
        "product_code",
        "product_description",
        "category_key",
        "subcategory_key",
        "color_key",
        "size_key",
        "product_cost",
        "product_quantity",
        "product_unit_price",
        "product_amount"
    ]

    let returnFunction = true
    for (let field of requiredProductsFields) {
        let wantedField = payload.find(product => {
            if (product[0] == field) {
                return product[1]
            }
        })

        if (wantedField == undefined || wantedField?.length == 0) {
            returnFunction = field
            break
        }
    }

    return returnFunction
}

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
    
    // CAMPOS OBRIGATÓRIOS NO PAYLOAD A NIVEL DE CABEÇALHO
    const requiredFields = [
        "client",
        "payment_key",
        "sale_amount",
        "sale_cost",
        "products"
    ]

    let invalidRequest = false

    for (let field of requiredFields) {
        let wantedField = requestKeyValues.find(bodyField => {
            if (field == bodyField[0]) {
                return bodyField
            }
        })

        // VERIFICA SE O CAMPO NÃO FOI ENCONTRADO NO PAYLOAD
        if (wantedField == undefined) {
            res.status(400).send({
                status: "error",
                message: `The property ${field} is not defined`
            })
            invalidRequest = true
            break
        }

        if (wantedField[0] != 'products' && wantedField[0] != 'client') {
            if (wantedField[1]?.length == 0) {
                res.status(400).send({
                    status: "error",
                    message: `The property ${field} has invalid value`
                })
                invalidRequest = true
                break
            }

        } else if(wantedField[0] == 'products'){

            // SE O CAMPO DE PRODUTOS NÃO FOR UM ARRAY, O FORMATO É INVÁLIDO
            if (!Array.isArray(wantedField[1])) {

                res.status(400).send({
                    status: "error",
                    message: `The property ${field} is not array`
                })

                invalidRequest = true
                break
            }

            for (let product of wantedField[1]) {
                // RETORNA TRUE QUANDO FOR VÁLIDO, SE NÃO RETORNA A PROPRIEDADE INVÁLIDA
                let property = validateProductPayload(product)

                if (property !== true) {
                    res.status(400).send({
                        status: "error",
                        message: `The product property ${property} is not defined or has invalid value`
                    })
                    invalidRequest = true
                    break
                }
            }
        }else if(wantedField[0] == 'client'){
            if(typeof wantedField[1] !== 'object'){
                res.status(400).send({
                    status: "error",
                    message: `The property ${field} is not object`
                })
                invalidRequest = true
                break
            }

            if(wantedField[1]?.unidentified_client == null || typeof wantedField[1]?.unidentified_client !== 'boolean'){
                res.status(400).send({
                    status: "error",
                    message: `The property unidentified_client is not defined or has invalid value`
                })
                invalidRequest = true
                break
            }

            if(wantedField[1]?.unidentified_client){
                if(wantedField[1]?.client_name == null || wantedField[1]?.client_name.length == 0){
                    res.status(400).send({
                        status: "error",
                        message: `The property client_name is not defined or has invalid value`
                    })
                    invalidRequest = true
                    break
                }
            }
        }
    }

    // SE POSSUIR REQUEST INVÁLIDA NÃO DEVE PROSSEGUIR COM O PROCESSAMENTO
    if (invalidRequest) {
        return false
    }

}