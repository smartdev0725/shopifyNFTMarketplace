import {
    getContracts,
    getSigners,
} from "../helpers/utils";
import { deployments } from "hardhat";
import chai, { expect } from "chai";
import { solidity } from "ethereum-waffle";

chai.use(solidity);

describe("NFT Contract", function () {

    it("should mint an nft", async function () {
        await deployments.fixture();
        const { deployerSigner, userSigner, user2Signer } = await getSigners();
        const { NFTContract, } = await getContracts();
        await NFTContract.connect(deployerSigner).safeMint(userSigner.address, "test");

        expect(
            await NFTContract.balanceOf(userSigner.address)
        ).to.be.equal(1);
    });
    it("should mint an nft batch", async function () {
        await deployments.fixture();
        const { deployerSigner, userSigner, user2Signer } = await getSigners();
        const { NFTContract, } = await getContracts();
        await NFTContract.connect(deployerSigner)
            .safeMintBatch(
                [userSigner.address, user2Signer.address],
                ["test", "test"]
            );

        expect(
            await NFTContract.balanceOf(userSigner.address)
        ).to.be.equal(1);
        expect(
            await NFTContract.balanceOf(user2Signer.address)
        ).to.be.equal(1);
    });
    it("should premint an nft batch", async function () {
        await deployments.fixture();
        const { deployerSigner, userSigner, user2Signer } = await getSigners();
        const { NFTContract, } = await getContracts();
        await NFTContract.connect(deployerSigner)
            .safeMintBatch(
                ["test", "test"]
            );

        expect(
            await NFTContract.balanceOf(deployerSigner.address)
        ).to.be.equal(2);
    });
});