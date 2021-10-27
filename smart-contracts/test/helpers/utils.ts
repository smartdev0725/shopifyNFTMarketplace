import { ethers } from "hardhat";

export const getSigners = async () => {
  const signers = await ethers.getSigners();
  return {
    deployerSigner: signers[0],
    userSigner: signers[1],
    user2Signer: signers[2],
    user3Signer: signers[3],
  };
};

export const getContracts = async () => {
  const NFTContract = await ethers.getContract("GenericNFT");

  return {
    NFTContract,
  };
};

export const getTimestamp = async (blocknumber: number) => {
  return (await ethers.provider.getBlock(blocknumber)).timestamp;
};