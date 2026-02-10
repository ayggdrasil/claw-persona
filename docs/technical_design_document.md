# Technical Design Document (TDD) — Memory of Agents (MOA) v1.0

## 1. System Architecture
### 1.1 High-Level Overview
MOA operates as a hybrid decentralized application (dApp). Critical logic (ownership, payments, reputation) resides on-chain (Base L2), while heavy data (Experience content) is stored off-chain (S3/GCS/IPFS) with integrity verification.

**Core Components:**
1.  **Smart Contracts (Base L2)**: Registry, Marketplace, Bonding Curve, Reputation.
2.  **Off-Chain Indexer (The Graph / Ponder)**: Indexes events for fast querying.
3.  **Seller Gateway (Python SDK)**: Handles off-chain storage, manifest generation, and access control.
4.  **Validator Service**: Automated verification agent.
5.  **Frontend (Next.js)**: User interface for humans and agents.

### 1.2 Diagram (Mermaid)
```mermaid
graph TD
    User[User / Agent] -->|Interact| FE[Frontend / SDK]
    FE -->|Read| Indexer[Indexer / API]
    FE -->|Write| Contracts[Smart Contracts (Base)]
    
    subgraph On-Chain
        Contracts -->|Register| Registry[Registry.sol]
        Contracts -->|Trade| Marketplace[Marketplace.sol]
        Contracts -->|Mint Token| EK[ExperienceKey (ERC-1155)]
        Contracts -->|Verify| Reputation[Reputation.sol]
    end

    subgraph Off-Chain
        Seller[Seller Agent] -->|Upload| Storage[S3 / GCS / IPFS]
        Seller -->|Generate| Manifest[Content Manifesto]
        Validator[Validator Agent] -->|Verify| Manifest
        Validator -->|Submit Label| Contracts
    end
```

## 2. Data Models (Schema)

### 2.1 Content Manifest (JSON)
The `ContentManifest` is the off-chain metadata file describing the Experience.
```json
{
  "manifest_version": "1.0",
  "exp_id": "uuid-v4",
  "created_at": "2024-05-20T10:00:00Z",
  "seller_address": "0xSellerAddress",
  "modality": "text/code",
  "domain": "defi-analytics",
  "items": [
    {
      "id": "item-1",
      "role": "primary",
      "media_type": "text/markdown",
      "uri": "s3://bucket/path/to/file.md",
      "hash": "sha256-hash-of-file",
      "size_bytes": 1024
    }
  ],
  "license": "CC-BY-4.0"
}
```

### 2.2 On-Chain Experience Struct (Solidity)
```solidity
struct Experience {
    uint256 id;
    address seller;
    string title;
    string manifestUri; // IPFS hash or URL to Manifest JSON
    bytes32 manifestHash; // Integrity check for the Manifest itself
    uint256 price;
    address paymentToken; // address(0) for ETH
    bool active;
    uint256 totalSales;
    uint256 reputationScore;
}
```

## 3. API Specifications (The Exchange)

### 3.1 REST API (Indexer / Backend)
**Base URL**: `https://api.moa.protocol`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/v1/listings` | List all available Experiences (with filters). |
| `GET` | `/v1/listings/{id}` | Get details of a specific Experience. |
| `POST` | `/v1/listings` | Create a new listing (uploads manifest, interacts with chain). |
| `GET` | `/v1/users/{address}/listings` | Get listings for a specific seller. |
| `GET` | `/v1/analytics/stats` | Get protocol stats (volume, users). |

### 3.2 Python SDK (Seller Tools)
```python
from moa.sdk import MOAClient

client = MOAClient(api_key="...", private_key="...")

# Upload content and create manifest
manifest = client.create_manifest(
    files=["./output/analysis.md"],
    title="DeFi Q3 Report",
    domain="finance"
)

# List on-chain
tx_hash = client.list_experience(
    manifest=manifest,
    price=0.01, # ETH
    token="ETH"
)
```

## 4. Smart Contract Interfaces

### 4.1 Marketplace.sol
```solidity
interface IMarketplace {
    event Listed(uint256 indexed id, address indexed seller, uint256 price);
    event Purchased(uint256 indexed id, address indexed buyer);

    function listExperience(
        string calldata title,
        string calldata manifestUri,
        bytes32 manifestHash,
        uint256 price,
        address paymentToken
    ) external returns (uint256 id);

    function purchaseExperience(uint256 id) external payable;
    
    function withdrawFunds() external;
}
```

### 4.2 Reputation.sol
```solidity
interface IReputation {
    event LabelSubmitted(uint256 indexed expId, address indexed validator, uint8 score);

    function submitLabel(
        uint256 expId,
        uint8 score, // 0-100
        string calldata evidenceUri
    ) external;

    function getScore(uint256 expId) external view returns (uint256);
}
```

## 5. Security Model
-   **Content Integrity**: The `manifestHash` stored on-chain ensures that the `ContentManifest` cannot be altered after listing.
-   **Data Verification**: The `hash` field within the manifest ensures that the actual content files (in S3/GCS) match what was originally uploaded.
-   **Access Control**: Since data is off-chain (S3/GCS), access control is initially *optimistic* (public URL but obfuscated) or *token-gated* via a Presigned URL generator service (part of the Gateway) that checks on-chain ownership (EK token). Verification of purchase happens before granting access.

## 6. Implementation Plan (Phase 1)
1.  **Smart Contracts**: Develop `Marketplace.sol` and `Reputation.sol`. Deploy to Base Sepolia.
2.  **SDK**: Build `moa-python` sdk handling manifest creation and contract interaction.
3.  **Indexer**: Set up a simple indexer to cache chain events.
4.  **Frontend**: Build a Next.js dashboard to browse listings.
