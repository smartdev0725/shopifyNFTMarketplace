import {
    getContracts,
    getSigners,
} from "../helpers/utils";
import { deployments, ethers } from "hardhat";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";

chai.use(solidity);

describe("Factory", function () {

    beforeEach(async function () {
        await deployments.fixture();
        const {
            deployerSigner,
            NFTOwnerSigner
        } = await getSigners();
        const { factoryContract } = await getContracts();
        this.deployerSigner = deployerSigner;
        this.NFTOwnerSigner = NFTOwnerSigner;
        this.factoryContract = factoryContract;
    })

    it("should deploy factory", async function () {
        const owner = await this.factoryContract.owner();

        expect(
            owner
        ).to.be.equal(this.deployerSigner.address);
    });

    it("should deploy new NFT collection", async function () {
        await this.factoryContract.newCollection(
            "Test",
            "TST",
            this.NFTOwnerSigner.address
        )
        const NFTContractAddress = await this.factoryContract.collectionAddressFromId(0);
        const NFTContract = await ethers.getContractAt(
            "GenericNFT",
            NFTContractAddress
        );

        const owner = await NFTContract.owner();
        const name = await NFTContract.name();
        const symbol = await NFTContract.symbol();
        expect(name).to.be.equal("Test");
        expect(symbol).to.be.equal("TST");
        expect(owner).to.be.equal(this.NFTOwnerSigner.address);
    });
});