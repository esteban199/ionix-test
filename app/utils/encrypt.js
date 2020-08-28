import CryptoJS from "crypto-js";
import config from '../../config';

const decrypt = (data) => {
    const decrypted = CryptoJS.DES.decrypt(data, String(config.CRYPTO_JS_SECRET_KEY));
    return decrypted;
}

const encrypt = (data) => {
    const ciphertext = CryptoJS.DES.encrypt(data, String(config.CRYPTO_JS_SECRET_KEY)).toString();
    return ciphertext;
}

export {
    encrypt,
    decrypt
}