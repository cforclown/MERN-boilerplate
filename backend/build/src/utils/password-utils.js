"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.hashPassword = void 0;
const crypto_js_1 = require("crypto-js");
const environment_1 = require("./environment");
const hashPassword = async function (password) {
    return (0, crypto_js_1.SHA512)(password).toString(crypto_js_1.enc.Hex);
};
exports.hashPassword = hashPassword;
function encrypt(data) {
    return crypto_js_1.AES.encrypt(data, environment_1.Environment.getEncryptionKey()).toString();
}
exports.encrypt = encrypt;
function decrypt(encrypted) {
    return crypto_js_1.AES.decrypt(encrypted, environment_1.Environment.getEncryptionKey()).toString(crypto_js_1.enc.Utf8);
}
exports.decrypt = decrypt;
//# sourceMappingURL=password-utils.js.map