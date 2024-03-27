const { secp256k1 } = require("ethereum-cryptography/secp256k1");

(async () => {
  // You pass either a hex string, or Uint8Array
  const privateKey = secp256k1.utils.randomPrivateKey()
  const messageHash = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
  const publicKey = secp256k1.getPublicKey(privateKey);
  const signature = await secp256k1.sign(messageHash, privateKey);
  //console.log(r, s, recovery)
  //  const signature = {
  //   r: r,
  //   s: s,
  //   recovery: recovery
  //  }

   const serialized = await JSON.stringify(signature, (_, v) => typeof v === 'bigint' ? v.toString() : v)

   const deserialized = await JSON.parse(serialized,(_, v) => typeof v === 'string' ? BigInt(v) : v)

   console.log(deserialized)

   const isSigned = secp256k1.verify(deserialized, messageHash, publicKey);
   console.log(`verification: ${isSigned}`)
})()