import { Router } from "express";
import { astraCoin} from "../../server";

const nodesRouter: Router = Router();

nodesRouter.post("/register", (req, res) => {
  const { node } = req.body;
  try {
    astraCoin.registerNewNode(node)
    res.status(200).json({
        message: 'New node registered',
        availiableNodes:[...astraCoin.nodes]
    })
  } catch (error) {
    res.status(404).json(JSON.stringify({ error }));
  }
});

nodesRouter.get('/getChain', (req,res) => {
  const chain = astraCoin.chain
  res.status(200).json(chain)
})

export default nodesRouter;