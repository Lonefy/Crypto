var CryptoJS = require('./cryptojs/aes.js')
var JSEncrypt = require('./jsencrypt/jsencrypt.js')

module.exports = (function() {

    JSEncrypt = JSEncrypt.JSEncrypt

    /**
     * RSA part
     */
    function RSAencrypt(txt, pub_key) {
        var crypt = new JSEncrypt();
        crypt.setPublicKey(pub_key);

        return crypt.encrypt(txt)
    }

    function RSAdecrypt(txt, pub_key) {
        var crypt = new JSEncrypt();
        crypt.setPublicKey(pub_key);

        return crypt.decrypt(txt)
    }


    /**
     * AES part
     */
    function AESencrypt(txt, key) {

        key = CryptoJS.enc.Utf8.parse(key);

        return CryptoJS.AES.encrypt(txt, key, {
            iv: CryptoJS.enc.Utf8.parse(''),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        }).toString()
    }

    function AESdecrypt(txt, key) {

        key = CryptoJS.enc.Utf8.parse(key);
        return CryptoJS.AES.decrypt(txt, key, {
            iv: CryptoJS.enc.Utf8.parse(''),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        }).toString()
    }

    function generatorAESKEY(b) {
        var bit = b || 16,
            CHARSET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            l = CHARSET.length,
            re = []

        for (var i = 16; i ; i--) {
            let index = Math.floor((Math.random() * 100)) % l;
            re.push(CHARSET[index])
        }

        return re.join('')//'1234567890abcdef'
    }

    let Crypto = {
        RSA: {
            encrypt: RSAencrypt,
            decrypt: RSAdecrypt
        },
        AES: {
            generatorKey: generatorAESKEY,
            encrypt: AESencrypt,
            decrypt: AESdecrypt
        }
    }

    return window.Crypto = Crypto;
})()
