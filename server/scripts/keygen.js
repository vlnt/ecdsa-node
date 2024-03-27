const { secp256k1 } = require("ethereum-cryptography/secp256k1")
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");

function hashMessage(message) {
    const bytes = utf8ToBytes(message)
    const hash = keccak256(bytes)
    return hash
}

function signMessage(msg, pk) {

    const msgHash = hashMessage(msg)

    return secp256k1.sign(msgHash, pk)
}

async function recoverKey(message, signature, recoveryBit) {
    return secp.recoverPublicKey(hashMessage(message), signature, recoveryBit)
}

const message = 'hello!'

const privateKey = secp256k1.utils.randomPrivateKey()

console.log(`private key: ${toHex(privateKey)}`)

const publicKey = secp256k1.getPublicKey(privateKey)

console.log(`public key:  ${toHex(publicKey)}`)

const signature = signMessage(message, privateKey)
//const recoveredKey = recoverKey(message, signature, recoveryBit)
console.log(`signature:{\n r: ${signature.r} \n s: ${signature.s} \n recovery: ${signature.recovery} \n}`)

const isSigned = secp256k1.verify(signature, hashMessage(message), publicKey);
console.log(`verification: ${isSigned}`)