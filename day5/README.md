# 🏔️ Avalanche Web3 dApp: Full-Stack Journey (Day 1 - 5)

### **Developer Profile**

- **Name**: Rizky Andriyanto
- **NIM**: 231011401883
- **Program**: Full Stack Web3 dApp Shortcourse Completion

---

## 🔗 Live Production Links

- **Frontend (Vercel)**: [https://avalanche-web3-2xpw-32n4zwhch-olvatos-projects.vercel.app/](https://avalanche-web3-2xpw-32n4zwhch-olvatos-projects.vercel.app/)
- **Backend API (Railway)**: [https://avalanche-web3-production.up.railway.app/documentation](https://avalanche-web3-production.up.railway.app/documentation)

---

## 📅 Project Roadmap

| Day       | Primary Focus            | Technical Milestone                                     | Status       |
| :-------- | :----------------------- | :------------------------------------------------------ | :----------- |
| **Day 1** | **Wallet Connection**    | Core Wallet integration & provider setup.               | ✅ Completed |
| **Day 2** | **Smart Contract**       | SimpleStorage deployment on Avalanche Fuji.             | ✅ Completed |
| **Day 3** | **Frontend Integration** | Building Next.js UI & Wagmi integration.                | ✅ Completed |
| **Day 4** | **Backend API**          | NestJS bridge, Swagger documentation, & Event indexing. | ✅ Completed |
| **Day 5** | **Full Deployment**      | End-to-end integration & Cloud deployment.              | ✅ Completed |

---

## 🏗️ System Architecture & Integration

This application adopts industry-standard Web3 patterns by separating _Read_ and _Write_ paths for maximum efficiency and security:

### 1. Backend Service (NestJS & Railway)

- **Read-Only Bridge**: Fetches the latest on-chain state using `viem` to reduce RPC load on the client.
- **Event Indexing**: Queries `ValueUpdated` logs with built-in pagination metadata.
- **Deployment**: Hosted on Railway using the `/day4-backend` root directory configuration.

### 2. Frontend Interface (Next.js & Vercel)

- **API Consumption**: Retrieves global state from the Backend via REST API endpoints.
- **On-Chain Transactions**: Executes _Write_ operations directly from the user's wallet to the Smart Contract for security.
- **Deployment**: Hosted on Vercel with synchronized `NEXT_PUBLIC_BACKEND_URL` environment variables.

---

## ✅ Key Features Implemented

- **Seamless Wallet Connection**: Supports responsive Web3 login via Core Wallet.
- **Live Data Fetching**: Automatically displays the current stored value from the Smart Contract.
- **Transaction History**: Displays a paginated list of historical changes, including Transaction Hashes.
- **Secure Architecture**: Obfuscates sensitive blockchain RPC details within the backend layer.

---

## 🚀 Final Status: ✅ COMPLETED

This project has fulfilled all graduation criteria for the shortcourse, ranging from smart contract development to a fully accessible public web application in a production environment.

---

_Developed as the final submission for the Avalanche Web3 dApp Shortcourse 2026._
