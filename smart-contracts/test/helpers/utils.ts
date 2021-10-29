import { ethers } from "hardhat";

export const getSigners = async () => {
  const signers = await ethers.getSigners();
  return {
    deployerSigner: signers[0],
    NFTOwnerSigner: signers[1],
    user1Signer: signers[2],
    user2Signer: signers[3],
  };
};

export const getContracts = async () => {
  const factoryContract = await ethers.getContract("NFTFactory");

  return {
    factoryContract,
  };
};

export const getTimestamp = async (blocknumber: number) => {
  return (await ethers.provider.getBlock(blocknumber)).timestamp;
};