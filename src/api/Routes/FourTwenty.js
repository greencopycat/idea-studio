const express = require('express')
const Router = express.Router()
const { CODE_NOT_FOUND, MSG_NOT_FOUND } = require('./../Constents/Text')


Router.all('*', (req, res, next) => {
    return res.status(CODE_NOT_FOUND).send({status: CODE_NOT_FOUND, message: MSG_NOT_FOUND})
})


module.exports = Router