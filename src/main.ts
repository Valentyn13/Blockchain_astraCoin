import Blockchain from "./Blockchain/Blockchain";
import Transaction from "./Transaction/Transaction";

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "21354e36b4cc9d62221df1ce318b240940f30f8e23d39353bd473cab704d262f"
);
const myWalletAddress = myKey.getPublic("hex");

const astraCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "publick key goes here", 10);
tx1.signTransaction(myKey);
astraCoin.addTransaction(tx1);

console.log("\n Starting the miner...");
astraCoin.minePendingTransactions(myWalletAddress);

console.log(
  `\n Balance of [${myWalletAddress}] is`,
  astraCoin.getBalanceOfAddress(myWalletAddress)
);
