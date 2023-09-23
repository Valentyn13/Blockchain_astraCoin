import SHA256 from "crypto-js/sha256.js";
import Transaction from "../Transaction/Transaction";

export default class Block {
  index: number;
  timestamp: number;
  previousHash: string;
  transacions: Transaction[];
  nonce: number;
  hash: string;
  constructor(
    index: number,
    timestamp: number,
    transacions: Transaction[],
    previousHash: string
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.transacions = transacions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = Block.calculateHash(
      this.previousHash,
      this.timestamp,
      this.transacions,
      this.nonce,
      this.index
    );
  }

  static calculateHash(
    prevHas: string,
    timestamp: number,
    transacions: Transaction[],
    nonce: number,
    index:number
  ) {
    return SHA256(
      prevHas + timestamp + JSON.stringify(transacions) + nonce  + index
    ).toString();
  }

  mineBlock(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = Block.calculateHash(
        this.previousHash,
        this.timestamp,
        this.transacions,
        this.nonce,
        this.index
      );
    }
    console.log("Block mined: " + this.hash);
  }
}
