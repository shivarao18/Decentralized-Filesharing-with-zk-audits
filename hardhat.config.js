require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

console.log("INFURA_API_URL:", process.env.INFURA_API_URL);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);
console.log("ETHERSCAN_API_KEY:", process.env.ETHERSCAN_API_KEY);

module.exports = {
  defaultNetwork: "hardhat", // Default network for local development
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Optimize for frequent use
      },
    },
  },
  networks: {
    hardhat: {}, // Local network (default Hardhat network)
    localhost: {
      url: "http://127.0.0.1:8545", // Local development URL
      accounts: [process.env.PRIVATE_KEY], // Local account via .env
    },
    sepolia: {
      url: process.env.INFURA_API_URL, // RPC URL for Sepolia (Infura or Alchemy)
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Sepolia account private key
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY, // Etherscan API key for contract verification
  },
  paths: {
    sources: "./contracts", // Contract sources directory
    tests: "./tests", // Test directory
    cache: "./cache", // Cache directory
    artifacts: "./artifacts", // Compiled contract artifacts directory
  },
};
