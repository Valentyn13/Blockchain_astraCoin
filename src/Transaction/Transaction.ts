import { SHA256 } from "crypto-js";
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

export default class Transaction {
  sender: string | null;
  recepient: string;
  amount: number;
  signature: any;
  constructor(sender: string | null, recepient: string, amount: number) {
    this.sender = sender;
    this.recepient = recepient;
    this.amount = amount;
  }

  calculateHash() {
    return SHA256(this.sender + this.recepient + this.amount).toString();
  }

  signTransaction(signinKey: any) {
    if (signinKey.getPublic("hex") !== this.sender) {
      throw new Error("You cannot sign transactions of other wallets!");
    }

    const hashTr = this.calculateHash();
    const sig = signinKey.sign(hashTr, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid() {
    if (this.sender === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in this transaction");
    }

    const publicKey = ec.keyFromPublic(this.sender, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
