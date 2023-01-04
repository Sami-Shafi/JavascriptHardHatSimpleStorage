// ? imports
const { ethers, run, network } = require("hardhat");

// ? async
const main = async () => {
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);

	// ? no rpc url or private key needed
	console.log("Deploying...");
	const simpleStorage = await SimpleStorageFactory.deploy();
	await simpleStorage.deployed();
	console.log(`Deployed on ${simpleStorage.address}`);

	// ? check if the network is not hardhat defualt network
	if (network.config.chainId === 31337 || !process.env.ETHERSCAN_API_KEY)
		return;
	// wait a while and run the verification
	console.log("Waiting for 6 Block Confirmations...");
	await simpleStorage.deployTransaction.wait(6);
	await verify(simpleStorage.address, []);

	// update a value
	const currentValue = await simpleStorage.retrieve();
	console.log(`Current Value: ${currentValue}`);
	const transactionResponse = await simpleStorage.store(7);
	await transactionResponse.wait(1);
	const updatedValue = await simpleStorage.retrieve();
	console.log(`Updated To: ${updatedValue}`);
};

const verify = async (contractAddress, args) => {
	console.log("Verifying Contract...");
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguements: args,
		});
	} catch (err) {
		if (err.message.toLowerCase().includes("already verified")) {
			console.error("Already verified!");
		} else {
			console.error(err);
		}
	}
};

// ? promise
main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.log(err);
		process.exit(1);
	});
