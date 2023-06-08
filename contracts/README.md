# BEEF Series I

## Contracts

Create `.env` from `.env.example` and compile contracts, run tests etc.

```
npm i
npx hardhat compile
npx hardhat test
npx hardhat node
npx hardhat deploy --network localhost --reset
npx hardhat deploy --network goerli
npx hardhat concepts:set:all --network goerli
npx hardhat concepts:render:all --network goerli
npx hardhat withdraw --to 0x12345 --network goerli
npx hardhat verify
```

## Frontend

React/Next app found in `app/` using rainbowkit and wagmi.sh
