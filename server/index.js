const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;


const {verifyTransfer} = require('./scripts/utils')

app.use(cors());
app.use(express.json());

const balances = {
  "03f921c796c4513628c5511dc36ed03f109dee64618fbfa002fd259f44b3e8a5d2": 100,
  "02bf89c245447ea121e28b58c5f9a04f19dddb9658669b815d1c1b555dc5cd51ab": 50,
  "03dd7ed6bf63e8b3a4595cd2d5aa4a72e4c3da2f1c47262c088a18fb4fffbd13bb": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, sig } = await req.body;
  //console.log(sig)
  setInitialBalance(sender);
  setInitialBalance(recipient);
  try{
    const isVerified = await verifyTransfer(sender, recipient, amount, sig)
    console.log(isVerified)
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else if(isVerified) {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    } else {
      res.status(403).send({ message: "address not verified!" });
    }
  } catch(err){
    res.status(500).send({message: err.message})
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
