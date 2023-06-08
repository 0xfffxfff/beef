const { task } = require("hardhat/config");
const tokenIndex = require("../tokenindex.json");
const { mkdir, writeFile } = require("node:fs/promises");

task("concepts:render:all", "Render All Concepts from Token Index")
  // .addParam("id", "The ID of the mintpass")
  .setAction(async (taskArgs, hre) => {
    // const chainId = await hre.getChainId();
    const Beef = await hre.deployments.get("Beef");
    const BeefArtifact = await hre.ethers.getContractAt("Beef", Beef.address);

    await mkdir("./render", { recursive: true });

    for (const token of tokenIndex) {
      console.log(`Setting ${token.Index} – ${token.Title}`);
      for (
        let i = token.TokenIdRangeStart;
        i < token.TokenIdRangeStart + token.Supply;
        i++
      ) {
        const svg = await BeefArtifact.renderSVG(i);
        await writeFile(`../app/public/render/${i}.svg`, svg);
      }
    }
    console.log("All Done!");
  });
