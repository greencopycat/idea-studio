const express = require('express')
const Route = express.Router()
const Bubbles = require('./../Schemas/Bubbles')
const { CODE_FAILED, CODE_SUCCESS, MSG_DBFAILED, MSG_DBSUCCESS, MSG_DBDUP, MSG_GET_SUCCESS, MSG_NOT_FOUND } = require('./../Constants/Text')
const FIELDS = ['id', 'idea', 'tags', 'attachments', 'url', 'description', 'note', 'author']
const filereader = require('xlsx')
const fs = require('fs')

const setDbFields = (body) => {
    FIELDS.forEach((key) => {
        tar[key] && (des[key] = tar[key])
    })
    return des
}

Route.get('/template', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    return res.download(`${__dirname}/../Docs/populate.xlsx`)
})

Route.post('/populate', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
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
            try {
                if (err) {
                    const errorItem = [{keyValues: err.keyValue, name: err.name, message: err.message, errors: err}]
                    if (err.code === 11000) {
                        const respObj = {status: CODE_FAILED, message: MSG_DBDUP}
                        return res.status(CODE_FAILED).send(respObj)
                    } else {
                        return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED, error: errorItem})
                    }
                } else {
                    return res.status(CODE_SUCCESS).send({status: CODE_SUCCESS, message: MSG_DBSUCCESS})
                }
            } catch (ex) {
                console.error('[exception] -> ', { status: '502', message: 'something wrong', exception: ex})
            }
        })
    } else {
        return res.status(CODE_FAILED).send({status: CODE_FAILED, message: MSG_DBFAILED})
    }
})

Route.post('/add', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    if (req.body) {
        Bubbles.create(body, (err) => {
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
    } else {
        return res.status(CODE_FAILED).send({status:CODE_FAILED, message: MSG_NOT_FOUND})
    }
})

Route.get('/setfree', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    const query = {};
    let sortby = ''
    if (req.query) {
        if (req.query.sort) {
            sortby = req.query.sort
        }
        Object.keys(req.query).forEach((q) => FIELDS.includes(q) && (query[q] = { '$in' : req.query[q].split(',')}))
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

Route.get('/tags', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    const query = {}
    if (req.query) {
        Object.keys(req.query).forEach((q) => {
            FIELDS.includes(q) && (query[q] = req.query[q])
        })
    }
    Bubbles.aggregate([
        {$match: query},
        {$unwind: '$tags'},
        {$group: 
            {
                "_id": '$tags',
                "count": { $sum: 1}, 
                "ideas": { 
                    $push: {
                        "id": "$id",
                        "idea": '$idea'
                    }, 
                }
            }
        },
        {$sort: {'tags': 1}},
    ], (err, result) => {
        if (err) {
            return res.status(400).send({status: 400, message: 'Failed.', error: err})
        } else {
            return res.status(200).send({status: 200, message: 'Success.', body: result })
        }
    })
})

module.exports = Route