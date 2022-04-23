const express = require('express')
const Route = express.Router()
const Bubbles = require('./../Schemas/Bubbles')
const { CODE_FAILED, CODE_SUCCESS, MSG_DBFAILED, MSG_DBSUCCESS, MSG_DBDUP, MSG_GET_SUCCESS } = require('./../Constents/Text')
const FIELDS = ['idea', 'tags', 'image', 'url', 'description', 'note']
const filereader = require('xlsx')

const setDbFields = (des, tar) => { 
    FIELDS.forEach((key) => {
        tar[key] && (des[key] = tar[key])
    })
    return des
}

Route.post('/populate', (req, res, next) => {
    if (req.files && req.files.doc && req.files.doc.data) {    
        let file = filereader.read(req.files.doc.data)
        let sheets = file.Sheets;
        let arr = []
        for (let s in sheets) {
            let tmp = filereader.utils.sheet_to_json(sheets[s])
            tmp = tmp.forEach((ea) => {
                let tagArr = []
                if (ea.tags) {
                    // to lower (camel) case for all?
                    tagArr = ea.tags.replace(/[\[\]\s]/, '').split(',')
                    ea.tags = tagArr
                }
                arr.push(ea)
            })
        }
        Bubbles.create(arr, (err, result) => {
            if (err) {
                return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED})
            } else {
                return res.status(CODE_SUCCESS).send({status: CODE_SUCCESS, message: MSG_DBSUCCESS})
            }
        })
    } else {
        return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED})
    }
})

Route.post('/add', (req, res, next) => {
    if (req.body) {
        const data = setDbFields({}, req.body)
        if (data['tags'] && !data['tags'].length) {
            return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED})
        } else {
            Bubbles.create(data, (err) => {
                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        return res.status(CODE_FAILED).send({status:CODE_FAILED, message: MSG_DBDUP})
                    } else {
                        return res.status(CODE_FAILED).send({status:CODE_FAILED, message: MSG_DBFAILED})
                    }
                } else {
                    return res.status(CODE_SUCCESS).send({status: CODE_SUCCESS, message: MSG_DBSUCCESS})
                }
            })
        }
    } else {
        return res.status()
    }
})

Route.get('/setfree', (req, res, next) => {
    const query = {};
    if (req.query) {
        Object.keys(req.query).forEach((q) => FIELDS.includes(q) && (query[q] = req.query[q]))
    }
    Bubbles.find(query, '-_id -__v', (err, result) => {
        if(err) {
            return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED})
        } else {
            return res.status(CODE_SUCCESS).send({status: CODE_SUCCESS, message: MSG_GET_SUCCESS, body: result})
        }
    })
})

module.exports = Route