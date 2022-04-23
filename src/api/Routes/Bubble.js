const express = require('express')
const Route = express.Router()
const Bubbles = require('./../Schemas/Bubbles')
const { CODE_FAILED, CODE_SUCCESS, MSG_DBFAILED, MSG_DBSUCCESS, MSG_DBDUP, MSG_GET_SUCCESS, MSG_NOT_FOUND } = require('./../Constents/Text')
const FIELDS = ['idea', 'tags', 'attachments', 'url', 'description', 'note', 'author']
const filereader = require('xlsx')
const fs = require('fs')

const setDbFields = (des, tar) => { 
    FIELDS.forEach((key) => {
        tar[key] && (des[key] = tar[key])
    })
    return des
}

Route.post('/populate', (req, res, next) => {
    // no attachments here, need to upload individually from UI
    // find Bubble by author, by tags
    // author using different table to support authentication/ permission
    if (req.files && req.files.doc && req.files.doc.data) {    
        let file = filereader.read(req.files.doc.data)
        let sheets = file.Sheets;
        let arr = []

        for (let s in sheets) {
            let tmp = filereader.utils.sheet_to_json(sheets[s])
            tmp.forEach((ea) => {
                let tagArr = []
                if (ea.tags) {
                    // to lower (camel) case for all?
                    tagArr = ea.tags.replace(/[\[\]\s]/ig, '').split(',')
                    ea.tags = tagArr
                }
                arr.push(ea)
            })
        }
        Bubbles.create(arr, (err, result) => {
            if (err) {
                const errorItem = [{keyValues: err.keyValue, name: err.name, message: err.message}]
                if (err.code === 11000) {
                    return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBDUP, error: errorItem})
                } else {
                    return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED, error: errorItem})
                }
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
        req.files && Object.keys(req.files).forEach((field) => {
            const files = req.files[field];
            data.attachments = []
            if (files.length) {
                files.forEach((f) => {
                    const att = {
                        data: f.data,
                        contentType: f.mimetype,
                        name: f.name
                    }
                    data.attachments.push(att)
                })
            } else {
                data.attachments.push(
                    {
                        data: files.data,
                        contentType: files.mimetype,
                        name: files.name
                    })
            }
        })
        if (data['tags'] && !data['tags'].length) {
            return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED})
        } else {
            data[`tags`] = data[`tags`].replace(/[\[\]\s]/ig, '').split(',')
            Bubbles.create(data, (err) => {
                if (err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        delete err[`errors`]
                        delete err[`_message`]
                        return res.status(CODE_FAILED).send({status:CODE_FAILED, message: MSG_DBDUP, error: err})
                    } else {
                        delete err[`errors`]
                        delete err[`_message`]
                        return res.status(CODE_FAILED).send({status:CODE_FAILED, message: MSG_DBFAILED, error: err})
                    }
                } else {
                    return res.status(CODE_SUCCESS).send({status: CODE_SUCCESS, message: MSG_DBSUCCESS})
                }
            })
        }
    } else {
        return res.status(CODE_FAILED).send({status:CODE_FAILED, message: MSG_NOT_FOUND})
    }
})

Route.get('/setfree', (req, res, next) => {
    const query = {};
    const sortby = {}
    if (req.query) {
        if (req.query.sort) {
            sortby[`tags`] = 1
        }
        Object.keys(req.query).forEach((q) => FIELDS.includes(q) && (query[q] = req.query[q]))
    }
    Bubbles.find(query, '-_id -__v')
    .sort(sortby)
    .exec( (err, result) => {
        if(err) {
            return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED})
        } else {
            return res.status(CODE_SUCCESS).send({status: CODE_SUCCESS, message: MSG_GET_SUCCESS, body: result})
        }
    })
})

module.exports = Route