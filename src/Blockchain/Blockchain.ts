import Block from "../Block/Block";
import Transaction from "../Transaction/Transaction";
import { astraCoin } from "../server/server";

export default class Blockchain {
  chain: Block[];
  nodes: Set<string>;
  difficulty: number;
  pendingTransactions: Transaction[];
  miningReward: number;
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
    this.nodes = new Set();
  }

  createGenesisBlock() {
    return new Block(
      0,
      Date.now(),
      [new Transaction("*Genesis block*", "*Genesis block*", 0)],
      "PVO"
    );
  }

  resolvConflict(nodesChain: Block[][]) {
    let isChanged = false
    const longestChain = nodesChain.reduce((acc, current) => {
      if (current.length > this.chain.length && current.length > acc.length) {
        acc = current;
        isChanged = true
        return acc;
      }
      return acc;
    }, []);
     const isNewChainValid = Blockchain.isChainValid(longestChain)
     if (isNewChainValid) this.chain = longestChain;
     return {
      isChanged,
      chan: this.chain
     }
  }

  registerNewNode(node: string) {
    this.nodes.add(node);
  }

  getLatesBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress: string) {
    const rewardTr = new Transaction(
      null,
      miningRewardAddress,
      this.miningReward
    );
    this.pendingTransactions.push(rewardTr);

    const block = new Block(
      astraCoin.getLatesBlock().index + 1,
      Date.now(),
      this.pendingTransactions,
      this.getLatesBlock().hash
    );
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transacion: Transaction) {
    if (!transacion.sender || !transacion.recepient) {
      throw new Error("Transaction must have sender and recepient fields");
    }

    this.pendingTransactions.push(transacion);
  }

  getBalanceOfAddress(address: string) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transacions) {
        if (trans.sender === address) {
          balance -= trans.amount;
        }

        if (trans.recepient === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  static isChainValid(chain: Block[]) {
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i - 1];

      if (
        currentBlock.hash !==
        Block.calculateHash(
          currentBlock.previousHash,
          currentBlock.timestamp,
          currentBlock.transacions,
          currentBlock.nonce,
          currentBlock.index
        )
      ) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
