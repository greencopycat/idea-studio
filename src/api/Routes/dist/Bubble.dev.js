"use strict";

var express = require('express');

var Route = express.Router();

var Bubbles = require('./../Schemas/Bubbles');

var _require = require('./../Constants/Text'),
    CODE_FAILED = _require.CODE_FAILED,
    CODE_SUCCESS = _require.CODE_SUCCESS,
    MSG_DBFAILED = _require.MSG_DBFAILED,
    MSG_DBSUCCESS = _require.MSG_DBSUCCESS,
    MSG_DBDUP = _require.MSG_DBDUP,
    MSG_GET_SUCCESS = _require.MSG_GET_SUCCESS,
    MSG_NOT_FOUND = _require.MSG_NOT_FOUND;

var FIELDS = ['id', 'idea', 'tags', 'attachments', 'url', 'description', 'note', 'author'];

var filereader = require('xlsx');

var fs = require('fs');

var setDbFields = function setDbFields(des, tar) {
  FIELDS.forEach(function (key) {
    tar[key] && (des[key] = tar[key]);
  });
  return des;
};

Route.get('/template', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  return res.download("".concat(__dirname, "/../Docs/populate.xlsx"));
});
Route.post('/populate', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*'); // no attachments here, need to upload individually from UI
  // find Bubble by author, by tags
  // author using different table to support authentication/ permission

  if (req.files && req.files.doc && req.files.doc.data) {
    (function () {
      var file = filereader.read(req.files.doc.data);
      var sheets = file.Sheets;
      var arr = [];

      for (var s in sheets) {
        var tmp = filereader.utils.sheet_to_json(sheets[s]);
        tmp.forEach(function (ea) {
          var tagArr = [];

          if (ea.tags) {
            // to lower (camel) case for all?
            tagArr = ea.tags.replace(/[\[\]\s]/ig, '').split(',');
            ea.tags = tagArr;
          }

          arr.push(ea);
        });
      }

      Bubbles.create(arr, function (err, result) {
        try {
          if (err) {
            var errorItem = [{
              keyValues: err.keyValue,
              name: err.name,
              message: err.message,
              errors: err
            }];

            if (err.code === 11000) {
              var respObj = {
                status: CODE_FAILED,
                message: MSG_DBDUP
              };
              return res.status(CODE_FAILED).send(respObj);
            } else {
              return res.status(CODE_FAILED).send({
                status: CODE_FAILED,
                message: MSG_DBFAILED,
                error: errorItem
              });
            }
          } else {
            return res.status(CODE_SUCCESS).send({
              status: CODE_SUCCESS,
              message: MSG_DBSUCCESS
            });
          }
        } catch (ex) {
          console.error('[exception] -> ', {
            status: '502',
            message: 'something wrong',
            exception: ex
          });
        }
      });
    })();
  } else {
    return res.status(CODE_FAILED).send({
      status: CODE_FAILED,
      message: MSG_DBFAILED
    });
  }
});
Route.post('/add', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');

  if (req.body) {
    var data = setDbFields({}, req.body);
    req.files && Object.keys(req.files).forEach(function (field) {
      var files = req.files[field];
      data.attachments = [];

      if (files.length) {
        files.forEach(function (f) {
          var att = {
            data: f.data,
            contentType: f.mimetype,
            name: f.name
          };
          data.attachments.push(att);
        });
      } else {
        data.attachments.push({
          data: files.data,
          contentType: files.mimetype,
          name: files.name
        });
      }
    });

    if (data['tags'] && !data['tags'].length) {
      return res.status(CODE_FAILED).send({
        status: CODE_FAILED,
        message: MSG_DBFAILED
      });
    } else {
      data["tags"] = data["tags"].replace(/[\[\]\s]/ig, '').split(',');
      Bubbles.create(data, function (err) {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
            delete err["errors"];
            delete err["_message"];
            return res.status(CODE_FAILED).send({
              status: CODE_FAILED,
              message: MSG_DBDUP,
              error: err
            });
          } else {
            delete err["errors"];
            delete err["_message"];
            return res.status(CODE_FAILED).send({
              status: CODE_FAILED,
              message: MSG_DBFAILED,
              error: err
            });
          }
        } else {
          return res.status(CODE_SUCCESS).send({
            status: CODE_SUCCESS,
            message: MSG_DBSUCCESS
          });
        }
      });
    }
  } else {
    return res.status(CODE_FAILED).send({
      status: CODE_FAILED,
      message: MSG_NOT_FOUND
    });
  }
});
Route.get('/setfree', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  var query = {};
  var sortby = '';

  if (req.query) {
    if (req.query.sort) {
      sortby = req.query.sort;
    }

    Object.keys(req.query).forEach(function (q) {
      return FIELDS.includes(q) && (query[q] = {
        '$in': req.query[q].split(',')
      });
    });
  }

  Bubbles.find(query, '-_id -__v').sort(sortby).exec(function (err, result) {
    if (err) {
      return res.status(CODE_FAILED).send({
        status: CODE_FAILED,
        message: MSG_DBFAILED
      });
    } else {
      return res.status(CODE_SUCCESS).send({
        status: CODE_SUCCESS,
        message: MSG_GET_SUCCESS,
        body: result
      });
    }
  });
});
Route.get('/tags', function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  var query = {};

  if (req.query) {
    Object.keys(req.query).forEach(function (q) {
      FIELDS.includes(q) && (query[q] = req.query[q]);
    });
  }

  Bubbles.aggregate([{
    $match: query
  }, {
    $unwind: '$tags'
  }, {
    $group: {
      "_id": '$tags',
      "count": {
        $sum: 1
      },
      "ideas": {
        $push: {
          "id": "$id",
          "idea": '$idea'
        }
      }
    }
  }, {
    $sort: {
      'tags': 1
    }
  }], function (err, result) {
    if (err) {
      return res.status(400).send({
        status: 400,
        message: 'Failed.',
        error: err
      });
    } else {
      return res.status(200).send({
        status: 200,
        message: 'Success.',
        body: result
      });
    }
  });
});
module.exports = Route;