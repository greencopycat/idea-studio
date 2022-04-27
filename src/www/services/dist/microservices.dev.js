"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var api = function api(endpoint, query) {
  return regeneratorRuntime.async(function api$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(endpoint, query).then(function (data) {
            if (data.status >= 400) {
              return data.json();
            } else {
              return data.json();
            }
          }).then(function (data) {
            return Promise.resolve(data);
          })["catch"](function (err) {
            return Promise.reject(err);
          }));

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

var get = function get(endpoint, query, callback) {
  return api(endpoint, {
    method: 'GET',
    mode: 'cors'
  });
};

var post = function post(endpoint, query, callback) {
  return regeneratorRuntime.async(function post$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (query) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", Promise.reject({
            status: 400,
            message: 'Please provide data.'
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(api(endpoint, {
            method: 'POST',
            body: query
          }).then(function (data) {
            return data;
          })["catch"](function (err) {
            return Promise.reject(err);
          }));

        case 6:
          return _context2.abrupt("return", _context2.sent);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var remove = function remove(endpoint, query, callback) {
  return regeneratorRuntime.async(function remove$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var put = function put(endpoint, query, callback) {
  return regeneratorRuntime.async(function put$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var MS = {
  get: get,
  post: post,
  remove: remove,
  put: put
};
var _default = MS;
exports["default"] = _default;