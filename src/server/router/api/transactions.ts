import { Router } from "express";
import Transaction from "../../../Transaction/Transaction";
import { astraCoin, myKey, myWalletAddress } from "../../server";
import { ITransactionRequest } from "../../types/transaction.types";

const transactionRouter: Router = Router();

transactionRouter.post("/new", (req: ITransactionRequest, res) => {
  const { recepient, amount } = req.body;
  try {
    const newTr = new Transaction(myWalletAddress, recepient, amount);
    newTr.signTransaction(myKey);
    astraCoin.addTransaction(newTr);
    res.status(200).json({ transactions: astraCoin.pendingTransactions });
  } catch (error) {
    res.status(404).json(JSON.stringify({ error }));
  }
});

export default transactionRouter;
