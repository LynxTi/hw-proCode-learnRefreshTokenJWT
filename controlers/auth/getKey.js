const path = require('path');
const fs = require('fs-extra');

let privKey = null;
let pubKey = null;

const getPrivateKey = async () => {
    if (!privKey) {
        const keyPath = path.join(__dirname, '../../keys/priv.key');
        privKey = await fs.readFile(keyPath, 'utf-8')
    }
    return privKey;
}

const getPublickKey = async () => {
    if (!pubKey) {
        const keyPath = path.join(__dirname, '../../keys/pub.key');
        pubKey = await fs.readFile(keyPath, 'utf-8')
    }
    return pubKey;
}

module.exports = {
    getPrivateKey,
    getPublickKey
}
