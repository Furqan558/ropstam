// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ropstam is ERC20Burnable {
    constructor() ERC20("Ropstam", "ROP") {
        _mint(msg.sender, 100000000 * (10 ** uint256(decimals())));  // Mint initial supply
    }

    function buy() public payable {
        uint256 amount = msg.value * 100; // 1 wei = 100 Ropstam
        _mint(msg.sender, amount);
    }
}

contract NFTContract is ERC721URIStorage, Ownable {
    Ropstam public ropstam;
    mapping(address => bool) public hammerOwners;
    mapping(address => bool) public openApeOwners;

    constructor(address _ropstamAddress) ERC721("OpenApes and Hammers", "OAH") {
        ropstam = Ropstam(_ropstamAddress);
    }

    function mintHammer(address to, uint256 tokenId, string memory tokenURI) external onlyOwner {
        require(!openApeOwners[to], "The owner of an OpenApe cannot own a Hammer");
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        hammerOwners[to] = true;
    }

    function mintOpenApe(address to, uint256 tokenId, string memory tokenURI) external onlyOwner {
        require(!hammerOwners[to], "The owner of a Hammer cannot own an OpenApe");
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        openApeOwners[to] = true;
    }

    function buyNFT(uint256 tokenId) external {
        require(ropstam.balanceOf(msg.sender) >= 100, "Not enough Ropstam tokens to buy NFT");
        ropstam.burnFrom(msg.sender, 100);
        _transfer(owner(), msg.sender, tokenId);
    }

    function withdraw() external onlyOwner {
        uint256 balance = ropstam.balanceOf(address(this));
        require(balance > 0, "No balance to withdraw");
        ropstam.transfer(owner(), balance);
    }
} 
