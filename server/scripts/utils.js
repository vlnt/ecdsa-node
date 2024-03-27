const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");

const deserializeSignature = (sig) => {
    return JSON.parse(sig,(_, v) => typeof v === 'string' ? BigInt(v) : v)
} 

const verifyTransfer = async (sender, recipient, amount, sig) => {
    const bytes = utf8ToBytes(recipient+amount.toString())
    const hash = keccak256(bytes)
    const signature = await deserializeSignature(sig)
    //console.log(signature)
    const verified = secp256k1.verify(signature, hash, sender)

    return verified
}

exports.verifyTransfer = verifyTransfer