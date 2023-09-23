import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import Blockchain from '../Blockchain/Blockchain';
import AppRouter from './router';

const port  = process.argv[2]

export const myWalletAddress = '13ce318b240940f30f8e23d393';
export const astraCoin = new Blockchain();

const app = express();
app.use(cors());
const router = new AppRouter(app);

app.set('port', port);
app.use(bodyParser.json({ limit: '100kb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '100kb' }));
router.init();

app.listen(port, () => console.log(`Server is running on port ${port}`));