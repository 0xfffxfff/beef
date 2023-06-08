const { task } = require("hardhat/config");

task("buy:fairprice", "Buy the fair price piece")
  .addParam("price", "Price in Ether (e.g. 0.123)")
  .setAction(async (args, hre) => {
    const Beef = await hre.deployments.get("Beef");
    const BeefArtifact = await hre.ethers.getContractAt("Beef", Beef.address);
    await BeefArtifact.buyAtFairPrice({
      value: hre.ethers.utils.parseEther(args.price),
    });
  });
