import {
    getContracts,
    getSigners,
} from "../helpers/utils";
import { deployments } from "hardhat";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";
import { ethers } from "hardhat";

chai.use(solidity);

describe("NFT Contract", function () {
    beforeEach(async function () {
        await deployments.fixture();
        const {
            deployerSigner,
            NFTOwnerSigner,
            user1Signer,
            user2Signer
        } = await getSigners();
        const { factoryContract } = await getContracts();
        // signers
        this.deployerSigner = deployerSigner;
        this.NFTOwnerSigner = NFTOwnerSigner;
        this.user1Signer = user1Signer;
        this.user2Signer = user2Signer;
        //contracts
        this.factoryContract = factoryContract;
        await this.factoryContract.newCollection(
            "Test",
            "TST",
            this.NFTOwnerSigner.address
        )
        const NFTContractAddress = await this.factoryContract.collectionAddressFromId(0);
        this.NFTContract = await ethers.getContractAt(
            "GenericNFT",
            NFTContractAddress
        );
    });

    it("should mint an nft", async function () {
        await this.NFTContract.connect(this.NFTOwnerSigner).safeMint(this.user1Signer.address, "test");

        expect(
            await this.NFTContract.balanceOf(this.user1Signer.address)
        ).to.be.equal(1);
    });
    it("should mint an nft batch", async function () {
        await this.NFTContract.connect(this.NFTOwnerSigner)
            .safeMintBatch(
                [this.user1Signer.address, this.user2Signer.address],
                ["test", "test"]
            );

        expect(
            await this.NFTContract.balanceOf(this.user1Signer.address)
        ).to.be.equal(1);
        expect(
            await this.NFTContract.balanceOf(this.user2Signer.address)
        ).to.be.equal(1);
    });
    it("should premint an nft batch", async function () {
        await this.NFTContract.connect(this.NFTOwnerSigner)
            .safePremint(
                ["test", "test"]
            );

        expect(
            await this.NFTContract.balanceOf(this.NFTOwnerSigner.address)
        ).to.be.equal(2);
    });
});