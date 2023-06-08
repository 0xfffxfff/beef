require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
process.env.REPORT_SIZE && require("hardhat-contract-sizer");

require("hardhat-deploy");

require("./tasks/concepts-set-all");
require("./tasks/concepts-render-all");
require("./tasks/withdraw");
require("./tasks/buy-fair-price");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2_000_000,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1:
        process.env.DEPLOYER_ADDRESS !== undefined
          ? process.env.DEPLOYER_ADDRESS
          : 0,
      goerli:
        process.env.DEPLOYER_ADDRESS !== undefined
          ? process.env.DEPLOYER_ADDRESS
          : 0,
    },
  },
  networks: {
    localhost: {
      gas: 6000000,
    },
    mainnet: {
      chainId: 1,
      timeout: 86_400_000,
      url: process.env.ROPSTEN_URL ?? "",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : undefined,
    },
    goerli: {
      chainId: 5,
      timeout: 240_000,
      url: process.env.GOERLI_URL ?? "",
      accounts:
        process.env.PRIVATE_KEY !== undefined
          ? [process.env.PRIVATE_KEY]
          : undefined,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    coinmarketcap: process.env.COINMARKETCAP,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    // only: [':ERC20$'],
  },
};

// Inject Frame RPC URL
if (process.env.FRAME_RPC_URL) {
  Object.keys(config.networks).forEach((network) => {
    config.networks[network].url = process.env.FRAME_RPC_URL;
  });
}

module.exports = config;
