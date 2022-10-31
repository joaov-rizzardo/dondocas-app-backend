const e = require("express");
const userModel = require("../models/user.model.js");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

function encryptValue(value) {
    return CryptoJS.AES.encrypt(value, process.env.SECRET).toString()
}

function decryptValue(value) {
    const bytes = CryptoJS.AES.decrypt(value, process.env.SECRET);

    return bytes.toString(CryptoJS.enc.Utf8)
}

exports.createProfile = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty or has invalid value'
        })
        return
    }

    if (!req.body.description || req.body.description == '') {
        res.status(400).send({
            status: 'error',
            message: 'The field description is not defined or has invalid value'
        })
        return
    }

    if (!req.body.level || req.body.level == '') {
        res.status(400).send({
            status: 'error',
            message: 'The field level is not defined or has invalid value'
        })
        return
    }

    userModel.createProfile(req.body.description, req.body.level, (err, data) => {
        if (err) {
            res.status(500).send({
                status: 'error',
                message: 'An internal server error ocurred'
            })
            return
        }

        res.status(201).send({
            status: 'success',
            message: 'The user profile has been created'
        })
    })
}

exports.createUser = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty or has invalid value'
        })
        return
    }

    const requestFields = Object.entries(req.body)

    const requiredFields = ['identification', 'password', 'name', 'profile']

    let stopCondition = false

    for (requiredField of requiredFields) {
        const searchedField = requestFields.find(requestField => {
            if (requestField[0] == requiredField) {
                return requestField
            }
        })

        if (searchedField === undefined || searchedField[1].length === 0) {
            res.status(400).send({
                status: 'error',
                message: `The field ${requiredField} is not defined or has invalid value`
            })
            stopCondition = true
            break
        }
    }

    if (stopCondition === true) return

    req.body.password = encryptValue(req.body.password)

    userModel.createUser(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                status: 'error',
                message: 'An internal server error ocurred'
            })
            return
        }

        res.status(201).send({
            status: 'success',
            message: 'The user has been created'
        })
    })
}

exports.authenticate = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            status: 'error',
            message: 'The content body is empty or has invalid value'
        })
        return
    }

    if (!req.body.identification && !req.body.password && !req.body.token) {
        res.status(400).send({
            status: 'error',
            message: 'Requireds fields is not defined or has invalid value'
        })
        return
    }

    if (req.body.identification && req.body.password) {
        userModel.getUser(req.body.identification, (err, data) => {

            if (err) {
                res.status(500).send({
                    status: 'error',
                    message: 'An internal server error ocurred'
                })
                return
            }

            if (data.length === 0) {
                res.status(200).send({
                    authenticated: false,
                    user: {},
                    token: ''
                })
                return
            }

            const user = data[0]

            if (decryptValue(req.body.password) == decryptValue(user.user_password) || req.body.password == decryptValue(user.user_password)) {

                delete user.user_password

                const token = jwt.sign(JSON.stringify(user), process.env.SECRET)

                res.status(200).send({
                    authenticated: true,
                    user: user,
                    token: token
                })
                return

            } else {
                res.status(200).send({
                    authenticated: false,
                    user: {},
                    token: ''
                })
                return
            }
        })
    }

    if (req.body.token) {

        try {
            const decoded = jwt.verify(req.body.token, process.env.SECRET)

            res.status(200).send({
                authenticated: true,
                user: decoded,
                token: req.body.token
            })

        } catch (error) {
            console.log(error)
            res.status(200).send({
                authenticated: false,
                user: {},
                token: ''
            })
        }
    }

}


