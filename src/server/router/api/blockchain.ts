import { Router } from "express";

import { astraCoin } from "../../server";
import { getCahinsOfAnotherNodes } from "../../helpers/node.helpers";
import Blockchain from "../../../Blockchain/Blockchain";

const blockchainRouter: Router = Router();

blockchainRouter.post("/mine", async (req, res) => {
  const { rewardAddress } = req.body;
  try {
    // const allChains = await getCahinsOfAnotherNodes(astraCoin.nodes)
    // astraCoin.resolvConflict(allChains)
    astraCoin.minePendingTransactions(rewardAddress);
    res.status(200).json({
      chain: astraCoin.chain,
    });
  } catch (error) {
    
  } 
});

blockchainRouter.get("/resolve", async (req,res) => {
  try {
    const allChains = await getCahinsOfAnotherNodes(astraCoin.nodes)
    const result  = astraCoin.resolvConflict(allChains)
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json( error );
  }
})

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

blockchainRouter.get("/isChainValid", (req, res) => {
  const isChainOk = Blockchain.isChainValid(astraCoin.chain);
  if (!isChainOk) res.status(500).json({ error: "Chain is not valid" });
  res.status(200).json('Chain is valid!')
});

export default blockchainRouter;
