'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var AWS = require('aws-sdk');

var options = process.env.AWS_REGION ? {} : { region: 'eu-west-1' };

var secretsManager = new AWS.SecretsManager(options);

var setAllTheSecrets = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(secretsId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return secretsManager.getSecretValue({ SecretId: secretsId }, function (error, secrets) {
                            if (error) {
                                throw Error(error);
                            }
                            var secretsObject = JSON.parse(secrets.SecretString);
                            Object.keys(secretsObject).forEach(function (secretKey) {
                                console.log('Setting ' + secretKey + ' as ' + secretsObject[secretKey]);
                                process.env[secretKey] = secretsObject[secretKey];
                            });
                        });

                    case 2:
                        return _context.abrupt('return', _context.sent);

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function setAllTheSecrets(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.setAllTheSecrets = setAllTheSecrets;