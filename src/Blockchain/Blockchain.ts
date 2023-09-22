import Block from "../Block/Block";
import Transaction from "../Transaction/Transaction";

export default class Blockchain {
  chain: Block[];
  nodes: Set<string>
  difficulty: number;
  pendingTransactions: Transaction[];
  miningReward: number;
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
    this.nodes = new Set()
  }

  createGenesisBlock() {
    return new Block(
      Date.now(),
      [new Transaction("*Genesis block*", "*Genesis block*", 0)],
      "PVO"
    );
  }

  registerNewNode (node: string) {
    this.nodes.add(node)
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

    const block = new Block(Date.now(), this.pendingTransactions);
    block.previousHash = this.getLatesBlock().hash;
    block.mineBlock(this.difficulty);

    console.log("Block successfully mined!");
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transacion: Transaction) {
    if (!transacion.sender || !transacion.recepient) {
      throw new Error("Transaction must have sender and recepient fields");
    }

    if (!transacion.isValid()) {
      throw new Error("Cannot add invalid transaction to chain");
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

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}
