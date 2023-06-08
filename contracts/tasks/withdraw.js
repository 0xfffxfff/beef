const { task } = require("hardhat/config");
const tokenIndex = require("../tokenindex.json");

task("withdraw", "Withdraw ETH from contract")
  .addParam("to", "address to")
  .setAction(async (args, hre) => {
    const Beef = await hre.deployments.get("Beef");
    const BeefArtifact = await hre.ethers.getContractAt("Beef", Beef.address);
    await BeefArtifact.withdraw(args.to);
  });
