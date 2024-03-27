const { secp256k1 } = require('@noble/curves/secp256k1');
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");

const msg = new Uint8Array('hello')
const priv = secp256k1.utils.randomPrivateKey();
const pub = secp256k1.getPublicKey(priv);
const sig = secp256k1.sign(msg, priv)
const recovered = sig.recoverPublicKey(msg).toRawBytes() // === pub; // public key recovery

console.log(`recovered: ${toHex(recovered)},\n public key: ${toHex(pub)}`)

