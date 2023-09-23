# How to run?

```
1. Clone repo;
2. npm i;
3. npm run server;
```
Two local servers will start at localhost:4200 and localhost:4201


## Endpoints

### Mine block
```
method: POST

http://localhost:4200/blockchain/mine

body: {
    "rewardAddress":"miner's address"
}
```

### Add transaction to blockchain transaction list
```
method: POST

http://localhost:4200/transaction/new
body: {
    "recepient":"some address",
    "amount": 100
}
```

### Get balance of address
```
method: GET

http://localhost:4200/blockchain/balance/:id

Example:

http://localhost:4200/blockchain/balance/123 - this endpoin get the balance of 123 wallet
```

### Register node
```
method: POST

http://localhost:4200/node/register

body: {
    "node": "http://localhost:4200"
}
```

### Get chain of a node
```
method: GET

http://localhost:4200/node/getChain
```