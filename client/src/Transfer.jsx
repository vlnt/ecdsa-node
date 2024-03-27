import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [sig, setSig] = useState({});

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const message = recipient + sendAmount;
      const bytes = utf8ToBytes(message);
      const hash = keccak256(bytes);
      if (privateKey) {
        await setSig(secp256k1.sign(hash, privateKey));
        //console.log(JSON.stringify(sig, (_, v) => typeof v === 'bigint' ? v.toString() : v))
      }
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        sig: JSON.stringify(sig, (_, v) =>
          typeof v === "bigint" ? v.toString() : v
        ),
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.message);
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
