'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var rp = require('request-promise');
var fs = require('fs');

var setCredentials = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        options = {
                            url: 'https://wormhole.api.bbci.co.uk/account/' + process.env.AWS_ACCOUNT_NUMBER + '/credentials',
                            cert: fs.readFileSync(process.env.CERT_LOCATION || '/etc/pki/tls/certs/client.crt'),
                            key: fs.readFileSync(process.env.COSMOS_CERT_KEY || '/etc/pki/tls/private/client.key'),
                            ca: fs.readFileSync(process.env.COSMOS_CA)
                        };
                        _context.next = 3;
                        return rp.get(options).then(function (response) {
                            var credentials = JSON.parse(response);
                            process.env.AWS_ACCESS_KEY_ID = credentials.accessKeyId;
                            process.env.AWS_SECRET_ACCESS_KEY = credentials.secretAccessKey;
                            process.env.AWS_SESSION_TOKEN = credentials.sessionToken;
                        });

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function setCredentials() {
        return _ref.apply(this, arguments);
    };
}();

exports.setCredentials = setCredentials;