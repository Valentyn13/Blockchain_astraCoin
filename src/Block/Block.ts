import SHA256 from "crypto-js/sha256.js";
import Transaction from "../Transaction/Transaction";

export default class Block {
  timestamp: number;
  previousHash: string;
  transacions: Transaction[];
  nonce: number;
  hash: string;
  constructor(
    timestamp: number,
    transacions: Transaction[],
    previousHash = ""
  ) {
    this.timestamp = timestamp;
    this.transacions = transacions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transacions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }

  hasValidTransactions() {
    for (const tx of this.transacions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}
