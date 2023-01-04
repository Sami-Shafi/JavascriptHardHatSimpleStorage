require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const { PRIVATE_KEY, GOERLI_RPC_URL, ETHERSCAN_API_KEY } = process.env;

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		goerli: {
			url: GOERLI_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 5,
		},
	},
	solidity: "0.8.7",
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
};
