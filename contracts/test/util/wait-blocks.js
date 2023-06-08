async function waitBlocks(hre, blockCount) {
    await network.provider.send("evm_increaseTime", [blockCount * 12]);
    await hre.network.provider.send("hardhat_mine", [`0x${blockCount.toString(16)}`, "0xC"]);
}

module.exports = {
    waitBlocks
}