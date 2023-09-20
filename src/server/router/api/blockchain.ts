import { Router } from "express";
import { astraCoin } from "../../server";

const blockchainRouter: Router = Router();

blockchainRouter.post("/mine", (req, res) => {
  const { rewardAddress } = req.body;
  try {
    astraCoin.minePendingTransactions(rewardAddress);
    res.status(200).json({
      chain: astraCoin.chain,
    });
  } catch (error) {
    res.status(404).json(JSON.stringify({ error }));
  }
});

blockchainRouter.get("/balance/:id", (req, res) => {
  const address = req.params.id;
  try {
    const walletBalance = astraCoin.getBalanceOfAddress(address);
    res.status(200).json({
      walletAddress: address,
      balance: walletBalance,
    });
  } catch (error) {
    res.status(404).json(JSON.stringify({ error }));
  }
});

blockchainRouter.get("isChainValid", (req, res) => {
  const isChainOk = astraCoin.isChainValid();
  if (!isChainOk) res.status(500).json({ error: "Chain is not valid" });
  res.status(200).json('Chain is valid!')
});

export default blockchainRouter;
