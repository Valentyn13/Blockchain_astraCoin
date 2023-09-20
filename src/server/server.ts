import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Blockchain from '../Blockchain/Blockchain';
import AppRouter from './router';

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

export const myKey = ec.keyFromPrivate(
  "21354e36b4cc9d62221df1ce318b240940f30f8e23d39353bd473cab704d262f"
);
export const myWalletAddress = myKey.getPublic("hex");
export const astraCoin = new Blockchain();

const app = express();
app.use(cors());
const router = new AppRouter(app);

app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '100kb' }));
router.init();

const port = app.get('port');

app.listen(port, () => console.log(`Server is running on port ${port}`));