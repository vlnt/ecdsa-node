const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");

const deserializeSignature = async (sig) => {
    return await JSON.parse(sig,(_, v) => typeof v === 'string' ? BigInt(v) : v)
} 

exports.deserializeSignature = deserializeSignature

const verifyTransfer = async (sender, recipient, amount, signature) => {
    const bytes = utf8ToBytes(recipient+amount.toString())
    const hash = keccak256(bytes)
    //console.log(signature)
    const verified = secp256k1.verify(signature, hash, sender)

    return verified
}

exports.verifyTransfer = verifyTransfer