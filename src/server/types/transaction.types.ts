import { Request } from "express";
export interface ITransactionRequest extends Request {
    body: {
        recepient: string;
        amount: number
    }
}