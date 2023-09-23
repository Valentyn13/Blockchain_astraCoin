
export default class Transaction {
  sender: string | null;
  recepient: string;
  amount: number;
  signature: any;
  constructor(sender: string | null, recepient: string, amount: number) {
    this.sender = sender;
    this.recepient = recepient;
    this.amount = amount;
  }

}
