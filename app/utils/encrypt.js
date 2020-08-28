const Des = require('react-native-des-cbc');
import config from '../../config';

const encrypt = (data) => {
    return new Promise((resolve, reject) => {
        Des.encrypt(data, String(config.CRYPTO_JS_SECRET_KEY), function (base64) {
            resolve(base64)
            return
        }, function () {
            reject();
        });
    })
}

const decrypt = (base64) => {
    return new Promise((resolve, reject) => {
        Des.decrypt(base64, String(config.CRYPTO_JS_SECRET_KEY), function(text) {
            resolve(text);
        }, function(){
            reject();
        });
    })
}

export {
    encrypt,
    decrypt
}