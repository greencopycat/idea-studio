"use strict";

var express = require('express');

var Router = express.Router();

var _require = require('./../Constants/Text'),
    CODE_NOT_FOUND = _require.CODE_NOT_FOUND,
    MSG_NOT_FOUND = _require.MSG_NOT_FOUND;

Router.all('*', function (req, res, next) {
  return res.status(CODE_NOT_FOUND).send({
    status: CODE_NOT_FOUND,
    message: MSG_NOT_FOUND
  });
});
module.exports = Router;