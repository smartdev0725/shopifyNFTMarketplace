/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";

module.exports = {
  networks: {
    hardhat: {
      // Uncomment these lines to use mainnet fork
      // forking: {
      //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
      //   blockNumber: 11689600,
      // },
    },
    // rinkeby: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_RINKEBY_KEY}`,
    //   accounts: { mnemonic: process.env.MNEMONIC },
    // },
    // live: {
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
    //   accounts: [process.env.MAINNET_PRIVKEY],
    // },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
  namedAccounts: {
    deployer: 0,
    NFTOwner: 1,
    user1: 2,
    user2: 3,
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 240000,
  },
};
