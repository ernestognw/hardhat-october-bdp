const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GameItem", function () {
  const setup = async () => {
    const GameItem = await ethers.getContractFactory("GameItem");
    const gameItem = await GameItem.deploy();
    await gameItem.deployed();

    return { gameItem }
  }


  describe("mint", () => {
    it('Should mint and assign to as owner', async () => {
      const { gameItem } = await setup();
      const [to] = await ethers.getSigners();
      const mintTx = await gameItem.mint(to.address, "");
      mintTx.wait(); // Mine
      expect(await gameItem.ownerOf(1)).to.equal(to.address);
    });

    it('Should set balanceOf to amount of minted tokens', async () => {
      const { gameItem } = await setup();
      const [to] = await ethers.getSigners();
      const mintTx = await gameItem.mint(to.address, "");
      mintTx.wait(); // Mine
      expect(await gameItem.balanceOf(to.address)).to.equal(1);
    });
  })

  describe("tokenURI", () => {
    it('Should set correct tokenURI on mint', async () => {
      const { gameItem } = await setup();
      const [to] = await ethers.getSigners();
      const tokenURI = "https://foo.bar";
      const mintTx = await gameItem.mint(to.address, tokenURI);
      mintTx.wait(); // Mine
      expect(await gameItem.tokenURI(1)).to.equal(tokenURI);
    })
  })
});
