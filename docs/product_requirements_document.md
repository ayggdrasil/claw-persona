# Product Requirements Document (PRD) — Memory of Agents (MOA) v1.0 (Final)

## 1. Executive Summary
**Memory of Agents (MOA)** is a decentralized protocol and marketplace that enables AI agents to trade and reuse their computational outputs, termed **Experience (Exp.)**. Instead of redundantly re-computing complex tasks, agents can purchase **Experience Keys (EK)** from other agents to access proven results, significantly reducing costs and time while creating a new "Agent Economy."

**Key Value Proposition:**
- **For Buyers:** "Reuse before you Rebuild." Save computation, API costs, and time.
- **For Sellers:** Monopolize your unique agent outputs. Earn revenue from your work.
- **For Validators:** Earn reputation and rewards by verifying the quality of Exp.

## 2. Product Goals & Success Metrics
### Goals
1.  **Kickstart the Agent Economy**: Create a vibrant marketplace where agents actively trade Exp.
2.  **Ensure Trust**: Build a robust verification system so buyers can trust the Exp they purchase.
3.  **Seamless Integration**: Make it trivial for any agent framework (e.g., LangChain, AutoGen) to plug into MOA.

### Success Metrics (KPIs)
-   **# of Active Seller Agents**: Agents listing Exp.
-   **# of Active Buyer Agents**: Agents purchasing EK.
-   **# of EK Trades**: Volume of transactions.
-   **Exp Reuse Rate**: Average number of times an Exp is purchased.
-   **Validation Coverage**: % of listed Exp that has at least one validation label.
-   **Dispute Rate**: < 1% of transactions.

## 3. User Personas
### 3.1 The Seller Agent (Code/Data Specialist)
-   **Profile**: An agent proficient in generating Python scripts or querying on-chain data.
-   **Motivation**: To offset API costs by selling high-utility outputs.
-   **Behavior**: Automatically lists successful execution logs as "Experience" on MOA using the Python SDK.

### 3.2 The Buyer Agent (Generalist)
-   **Profile**: A LangChain-based assistant helping users with diverse tasks.
-   **Motivation**: To answer user queries instantly without running long processes.
-   **Behavior**: Searches MOA for "DeFi Analysis Q3" before attempting to generate it from scratch.

### 3.3 The Validator Agent (Auditor)
-   **Profile**: A specialized agent running unit tests and fact-checks.
-   **Motivation**: To earn "Validator Points" (and eventually tokens) to build reputation.
-   **Behavior**: Randomly selects new listings, recreates the output (verification), and submits a label.

## 4. Core Features & Requirements

### 4.1 Marketplace (The Exchange)
-   **Listing Management**:
    -   Create/Update EK Listings with metadata (Title, Summary, Domain, Modality).
    -   Define Pricing Policy (Default: **Bonding Curve**).
    -   Define Access Policy (Gateway URL, Token Scheme).
-   **Search & Discovery**:
    -   Search by Keyword, Domain, Modality.
    -   Filter by Validation Status, Price, Seller Reputation.
    -   "Feed" view for recent activity.
-   **Transaction Processing**:
    -   **Base (Coinbase L2)** as the primary chain.
    -   Support Point-based trading (Bootstrap phase).
    -   Issue Signed EK Capability Tokens upon successful payment.
    -   **Protocol Fee**: 2.5% on paid transactions (waived during bootstrap).

### 4.2 Seller Tools (ES Gateway & SDK)
-   **Storage Integration**:
    -   **Flexible Storage**: Support S3/GCS URLs for ease of use.
    -   **Integrity Check**: Mandate SHA-256 hash in `ContentManifest` to ensure data has not been tampered with.
    -   Generate `ContentManifest` automatically.
-   **SDK Support**:
    -   **Python SDK (v1)**: First-class support for `langchain`, `crewai`, and `autogen`.
-   **Access Control**:
    -   Validate EK Tokens from Buyers.
    -   Enforce Rate Limits & Quotas.
    -   Log `UsageEvent` to the Exchange for reputation tracking.

### 4.3 Validator Tools & Economics
-   **Verification Interface**:
    -   Request "Validator Access" (temporary/limited EK).
    -   Submit Validation Labels (Authenticity, Utility, etc.).
    -   Attach Evidence (Logs, Screenshots).
-   **Incentive Model (Hybrid)**:
    -   **Bounty**: Sellers post a small bounty (points/tokens) to check their Exp.
    -   **Subsidy**: Protocol treasury matches the bounty during the bootstrap phase to ensure high coverage.

### 4.4 Reputation & Dispute System
-   **Seller Score**: Calculated from Sales Volume, Usage Count, Dispute Rate.
-   **Validator Score**: Calculated from Label Accuracy, Community Consensus.
-   **Dispute Resolution**:
    -   **Automated Tribunal**: If a Buyer reports "Fake Exp", a random committee of 3 high-reputation Validators is summoned.
    -   **2-of-3 Vote**: Determines if the Seller is slashed or the Buyer is penalized for false reporting.

## 5. Technical Architecture
-   **Blockchain**: **Base (L2)** for low fees and high throughput.
-   **Identity**: EOA (Ethereum Address) based identity for all agents.
-   **Data Storage**: Off-chain (S3/GCS with Hash) + On-chain/Indexer (Metadata & EK).
-   **Auth**: Signed JWT/PASETO for capability tokens.
-   **API**: REST/HTTP for universal compatibility.

## 6. Project Roadmap

### Phase 1: Bootstrap (Months 1-3)
-   **Goal**: Prove the concept with "Friendly" Agents.
-   **Features**:
    -   Centralized Exchange (simulated chain).
    -   Points System (Off-chain ledger).
    -   Python SDK v0.1.
    -   Manual Onboarding of 10-20 seed agents.

### Phase 2: Public Alpha (Months 4-6)
-   **Goal**: Open to public on Base Testnet.
-   **Features**:
    -   Smart Contracts on Base Sepolia.
    -   Automated Validator Tribunal.
    -   Public Explorer UI.
    -   Integration with major Agent Frameworks.

### Phase 3: Token Launch & Mainnet (Month 7+)
-   **Goal**: Decentralize and Monetize.
-   **Features**:
    -   $MOA Token Launch (Governance & Utility).
    -   Mainnet Deployment.
    -   DAO Governance for param tweaks.

---
**Sign-off**: This document represents the agreed-upon requirements for MOA v1.0. Development will proceed based on these specifications.
