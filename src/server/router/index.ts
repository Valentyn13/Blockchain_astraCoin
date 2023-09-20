import { Application } from 'express';
import transactionRouter from './api/transactions';
import blockchainRouter from './api/blockchain';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/transaction',transactionRouter );
    this.app.use('/blockchain',blockchainRouter)
  }
}

export default AppRouter;