const { task } = require("hardhat/config");

task("buy:sated", "Buy the sated piece").setAction(async (_, hre) => {
  const Beef = await hre.deployments.get("Beef");
  const BeefArtifact = await hre.ethers.getContractAt("Beef", Beef.address);
  await BeefArtifact.mint(9, {
    value: hre.ethers.utils.parseEther("0.1"),
    gasLimit: 30_000_000,
  });
});
