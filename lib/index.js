'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var awsCredentialsService = require('./lib/wormhole-credentials-service');
var secretService = require('./lib/secret-manager-service');

var exportAllSecretsAsEnvironmentVariables = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(secrets) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return awsCredentialsService.setCredentials();

                    case 3:
                        _context.next = 9;
                        break;

                    case 5:
                        _context.prev = 5;
                        _context.t0 = _context['catch'](0);

                        console.log('failed to set aws credentials', _context.t0);
                        return _context.abrupt('return', 1);

                    case 9:
                        _context.prev = 9;
                        _context.next = 12;
                        return secretService.setAllTheSecrets(secretsId);

                    case 12:
                        _context.next = 18;
                        break;

                    case 14:
                        _context.prev = 14;
                        _context.t1 = _context['catch'](9);

                        console.log('failed to set set environment variables', _context.t1);
                        return _context.abrupt('return', 1);

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 5], [9, 14]]);
    }));

    return function exportAllSecretsAsEnvironmentVariables(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.setAllSecretValuesAsEnvironmentVariables = exportAllSecretsAsEnvironmentVariables;