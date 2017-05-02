var CryptoJS = require('./cryptojs/aes.js')
var JSEncrypt = require('./jsencrypt/jsencrypt.js')

module.exports = (function() {

    JSEncrypt = JSEncrypt.JSEncrypt



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

    function AEScrypt(txt, key) {

        key = CryptoJS.enc.Utf8.parse(key);

        return CryptoJS.AES.encrypt(txt, key, {
            iv: CryptoJS.enc.Utf8.parse(''),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        }).toString()
    }

    let Crypto = {
        RSA: {
            encrypt: RSAencrypt,
            decrypt: RSAdecrypt
        },
        AES: {
            encrypt: AEScrypt
        }
    }

    return window.Crypto = Crypto;
})()
