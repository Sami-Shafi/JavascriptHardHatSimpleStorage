const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", () => {
	let simpleStorageFactory, simpleStorage;
	beforeEach(async () => {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await simpleStorageFactory.deploy();
	});

	it("Should Start with a FavNum of 0", async () => {
		const currentVal = await simpleStorage.retrieve();

		// ? assert and expect
		assert.equal(currentVal.toString(), "0");
	});

	it("Should Update when we call store", async () => {
		const expectedVal = "7";
		const transactionResponse = await simpleStorage.store(expectedVal);
		await transactionResponse.wait(1);

		const currentVal = await simpleStorage.retrieve();
		assert.equal(currentVal.toString(), expectedVal);
	});

	it("Should add a person and You should be able to get Favourite Number with Name", async () => {
		const name = "Sami";
		const favNum = 7;
		const transactionResponse = await simpleStorage.addPerson(name, favNum);
		await transactionResponse.wait(1);

		const currentName = await simpleStorage.nameToFavoriteNumber(name);
		assert.equal(currentName, "7");
	});
});
