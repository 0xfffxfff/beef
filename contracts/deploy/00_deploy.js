// const hre = require("hardhat");

module.exports = async ({ deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Beef", {
    args: [],
    from: deployer,
    gasLimit: 12_000_000,
    log: true,
    // nonce: 0,
    // gasPrice: 60_000_000_000 // 60
  });
};

module.exports.tags = ["Beef"];
