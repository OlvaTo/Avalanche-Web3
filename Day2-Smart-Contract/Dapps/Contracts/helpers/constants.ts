import { config } from "dotenv";

config();

export const USER_PRIVATE_KEY = process.env.PRIVATE_KEY || "";
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
export const POKT_API_KEY = process.env.POKT_API_KEY || "";
export const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
export const INFURA_API_SECRET = process.env.INFURA_API_SECRET || "";
export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || "";
export const MNEMONIC = process.env.MNEMONIC || "";
