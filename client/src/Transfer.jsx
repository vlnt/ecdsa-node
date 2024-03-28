import { useState, useEffect } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  //const [sig, setSig] = useState({});

  const setValue = (setter) => (evt) => {
    setter(evt.target.value);
    //console.log(evt.target.value)
  };

  function setSig(){
    const message = recipient + sendAmount;
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes);
  
    return secp256k1.sign(hash, privateKey)
  }



  async function transfer(evt) {
    evt.preventDefault()  
    try {
      const sig = setSig();

      let signature = await JSON.stringify(sig, (_, v) =>
        typeof v === "bigint" ? v.toString() : v
      );
      const payload = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        sig: signature,
      };
      console.log(payload);
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        sig: signature,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  console.log(privateKey);

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
