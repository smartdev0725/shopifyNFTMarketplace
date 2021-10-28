// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./GenericNFT.sol";

contract NFTFactory is Initializable, OwnableUpgradeable {
    mapping(uint256 => GenericNFT) public collectionAddressFromId;
    uint256 public collectionCount;

    function initialize() initializer public {
        __Ownable_init();
    }

    function newCollection(string memory name, string memory symbol, address owner) external onlyOwner{
        GenericNFT collection = new GenericNFT(name, symbol);
        collection.transferOwnership(owner);
        collectionAddressFromId[collectionCount];
        collectionCount++;
    }
}