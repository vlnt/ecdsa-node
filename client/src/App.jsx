import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer
        setBalance={setBalance}
        address={address}
        privateKey={privateKey}
      />
      <div>
        pk1=a48e5e97c39e02f6f0615d6e20bfe1a6e7a7c265407cc45a5ec967d034c0ca96
        pk2=6ba3ad2b09db00a6c2a4fd61240fcfe5bbf92d8a11ae191d84b9163b646e595c
        pk3=6cd12d938c32e92f211b7530936cb980401efaf1038076d38fdf02265ec25e4a
        <br />
        <br/>
        03f921c796c4513628c5511dc36ed03f109dee64618fbfa002fd259f44b3e8a5d2:
        100,
        02bf89c245447ea121e28b58c5f9a04f19dddb9658669b815d1c1b555dc5cd51ab:
        50,
        03dd7ed6bf63e8b3a4595cd2d5aa4a72e4c3da2f1c47262c088a18fb4fffbd13bb:
        75,
      </div>
    </div>
  );
}

export default App;
