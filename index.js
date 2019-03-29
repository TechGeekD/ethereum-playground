require("dotenv").config();
const Web3 = require("web3");
const Tx = require("ethereumjs-tx");
const rpcURL = process.env.ENDPOINT;
const web3 = new Web3(rpcURL);

const abi = require("./abi");

const account1 = process.env.ACCOUNT1;
const account1PK = process.env.ACCOUNT1PK;
const account2 = process.env.ACCOUNT1;
const account2PK = process.env.ACCOUNT2PK;

const privateKey1 = Buffer.from(account1PK, "hex");
const privateKey2 = Buffer.from(account2PK, "hex");

web3.eth.getBalance(account1, (err, wei) => {
  balance = web3.utils.fromWei(wei, "ether");
  console.log("******balance 1******", balance, "Ether");
});

web3.eth.getBalance(account2, (err, wei) => {
  balance = web3.utils.fromWei(wei, "ether");
  console.log("******balance 2******", balance, "Ether");
});

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build the transaction
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("0.1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei"))
  };

  // Sign the transaction
  const tx = new Tx(txObject);
  tx.sign(privateKey1);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
