const { task } = require("hardhat/config");

task("block-number", "Get The Current Block Number.").setAction(
    async (taskArgs, hre) => {
        const blockNum = await hre.ethers.provider.getBlockNumber();
        console.log(`Current Block Number: ${blockNum}`);
    }
);

module.exports = {}