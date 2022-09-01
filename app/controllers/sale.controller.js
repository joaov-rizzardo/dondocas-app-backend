const e = require("express");
const saleModel = require("../models/sale.model.js");
const url = require("../config/url.configs")
const { default: axios } = require("axios");

exports.validateCreateRequest = (req, res) => {

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
        "sale_net_amount",
        "sale_gross_amount",
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
            if (wantedField[1].length == 0) {
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

            if(wantedField[1].unidentified_client == null || typeof wantedField[1].unidentified_client !== 'boolean'){
                res.status(400).send({
                    status: "error",
                    message: `The property unidentified_client is not defined or has invalid value`
                })
                invalidRequest = true
                break
            }

            if(!wantedField[1].unidentified_client){
                if(wantedField[1].client_name == null || wantedField[1].client_name.length == 0){
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

    const requestPayload = req.body

    validateClient(requestPayload.client)
    .then(clientKey => {
        // SE O RETORNO FOR FALSE, OCORREU UM ERRO NO PROCESSAMENTO DO CLIENTE
        if(clientKey === false){
            res.status(500).send({
                status: 'error',
                message: 'An error ocurred in the client proccess'
            })
            return
        }

        const saleHeader = {
            client_key : clientKey,
            payment_key : requestPayload.payment_key,
            sale_net_amount : requestPayload.sale_net_amount,
            sale_gross_amount : requestPayload.sale_gross_amount,
            sale_cost : requestPayload.sale_cost
        }

        // CRIANDO O CABEÇALHO DA VENDA
        saleModel.createHeader(saleHeader, (err, data) => {
            if(err){
                console.log(err)
                res.status(500).send({
                    status: 'error',
                    message: 'An error ocurred in the sale header create'
                })
                return
            }
            
            // CHAVE RETORNADA PARA O CABEÇALHO CRIADO
            const saleKey = data.insertId

            const products = requestPayload.products.map(product => {
                return [
                    saleKey,
                    product.product_code,
                    product.product_description,
                    product.category_key,
                    product.subcategory_key,
                    product.color_key,
                    product.size_key,
                    product.product_unit_cost,
                    product.product_quantity,
                    product.product_unit_amount
                ]
            })

            // CRIA OS ITEMS PARA A SALE_KEY INFORMADA
            saleModel.createItems(products, (err, data) => {
                if(err){
                    console.log(err)
                    res.status(500).send({
                        status: 'error',
                        message: 'An error ocurred in the sale items create'
                    })
                    return
                }

                if(data.affectedRows > 0){
                    res.status(201).send({
                        status: 'success',
                        message: 'Sale has been created'
                    })

                }else{
                    res.status(500).send({
                        status: 'error',
                        message: 'An error ocurred in the sale items create'
                    })
                    return
                }

                
            })
        })
        
    })
}

// VERIFICA EXISTÊNCIA DO CLIENTE
// SE NÃO EXISTIR É CRIADO COM OS DADOS DO PAYLOAD
// SE EXISTIR É ATUALIZADO
// RETORNA O CLIENT_KEY
const validateClient = async client => {

    if(client.unidentified_client){
        return 1
    }else{

        const response = await axios.post(`${url.loopback}/client/getByFields`, {
            client_name : client.client_name,
            client_telephone: client.client_telephone
        }).catch(error => {
            console.log(error)
            return false

        })

        const clientData = response.data

        // SE RETORNAR O CLIENTE, ATUALIZA COM OS DADOS INFORMADOS
        if(clientData.length > 0){
            
            const clientKey = clientData[0].client_key

            const updatedClient = await axios.put(`${url.loopback}/client/update`, {
                client_key : clientKey,
                client_name: client.client_name,
                client_telephone: client.client_telephone
            }).catch(error => {
                console.log(error)
                return false
            })

            if(updatedClient.data.affectedRows >= 1){
                return clientKey
            }else{
                return false
            }
            
        // SE NÃO RETORNAR NENHUM CLIENTE, UM SERÁ CRIADO COM OS DADOS INFORMADOS
        }else{
            const createdClient = await axios.post(`${url.loopback}/client/create`, {
                client_name : client.client_name,
                client_telephone: client.client_telephone
            }).catch(error => {
                console.log(error)
                return false
            })

            return createdClient.data.insertId
        }
    }
}

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
        "product_unit_cost",
        "product_quantity",
        "product_unit_amount"
    ]

    let returnFunction = true

    for (let field of requiredProductsFields) {
        let wantedField = payload.find(product => {
            if (product[0] == field) {
                return product[1]
            }
        })

        if (wantedField == undefined || wantedField.length == 0) {
            returnFunction = field
            break
        }
    }

    return returnFunction
}

exports.getSaleByDate = (req, res) => {

    if(!req.body){
        res.status(400).send({
            status: 'error',
            message: 'Invalid request body'
        })

        return
    }

    if(!req.body.saleDate || req.body.saleDate.length == 0){
        res.status(400).send({
            status: 'error',
            message: 'The property saleDate is not defined or has a invalid value'
        })
        return
    }

    saleModel.getSaleHeader(req.body.saleDate, (err, data) => {

        if(err){
            res.status(500).send({
                status: 'error',
                message: 'Internal server error'
            })
            return
        }

        res.status(200).send(data)
    })

}

exports.getDailyInfo = (req, res) => {
    
    if(!req.body){
        res.status(400).send({
            status: 'error',
            message: 'Invalid request body'
        })

        return
    }

    if(!req.body.saleDate || req.body.saleDate.length == 0){
        res.status(400).send({
            status: 'error',
            message: 'The property saleDate is not defined or has a invalid value'
        })
        return
    }

    saleModel.getDailyInfo(req.body.saleDate, (err, data) => {

        if(err){
            res.status(500).send({
                status: 'error',
                message: 'Internal server error'
            })
            return
        }

        res.status(200).send(data[0])
    })
}