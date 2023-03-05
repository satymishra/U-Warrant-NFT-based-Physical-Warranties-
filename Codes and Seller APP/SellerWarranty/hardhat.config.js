/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle")

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
//  unused configuration commented out for now
 mumbai: {
   url: "https://rpc-mumbai.maticvigil.com",
   accounts: ["b43b49ad65ce0fe0632d4d2802582cd22efcd50423a51eba3aff5cfcabe1561c"]
 }
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}