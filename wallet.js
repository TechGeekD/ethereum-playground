require("dotenv").config();
const Wallet = require("ethereumjs-wallet");
const EthUtil = require("ethereumjs-util");

const account1PK = "0x" + process.env.ACCOUNT1PK;

const privateKeyBuffer = EthUtil.toBuffer(account1PK);

const wallet = Wallet.fromPrivateKey(privateKeyBuffer);

const publicKey = wallet.getPublicKeyString();
console.log("publicKey", publicKey);

const address = wallet.getAddressString();
console.log("address", address);

const keystoreFilename = wallet.getV3Filename();
console.log("keystoreFilename", keystoreFilename);

const password = process.env.PASSWORD;
const keystore = wallet.toV3(password);
console.log("keystore", keystore);

const unlocedkWallet = Wallet.fromV3(keystore, password);
const walletFetchedPK = unlocedkWallet.getPrivateKey().toString("hex");

console.log("Fetched Private key " + walletFetchedPK);
console.log(
  "Fetched Private key Matched: " +
    Boolean(String("0x" + walletFetchedPK) === account1PK).toString()
);
