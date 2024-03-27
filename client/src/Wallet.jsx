import server from "./server";
import {secp256k1} from "ethereum-cryptography/secp256k1.js"
import {toHex} from"ethereum-cryptography/utils"

function Wallet({ privateKey, setPrivateKey, address, setAddress, balance, setBalance }) {

  async function onChange(evt) {
    //console.log(evt.target.value)
    const privateKey = evt.target.value;
    setPrivateKey(privateKey)
    try{
      const address = toHex(secp256k1.getPublicKey(privateKey))
      setAddress(address);
      if (address) {
        //setAddress(address);
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    }catch(err){
      alert(err.message)
      setAddress("")
      setBalance(0)
    }
    
    console.log(address)
    
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Private Key
        <input placeholder="Type your private key" value={privateKey} onChange={onChange}></input>
      </label>
      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={()=>{}}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
