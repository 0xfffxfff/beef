const { task } = require("hardhat/config");
const tokenIndex = require("../tokenindex.json");

task("concepts:set:all", "Set All Concepts from Token Index").setAction(
  async (taskArgs, hre) => {
    const Beef = await hre.deployments.get("Beef");
    const BeefArtifact = await hre.ethers.getContractAt("Beef", Beef.address);

    // Prepare batches of 10
    const conceptArrays = [];
    for (let index = 0; index < tokenIndex.length; index++) {
      const token = tokenIndex[index];
      const text = splitIntoLines(token.Text).map((l) =>
        hre.ethers.utils.formatBytes32String(l)
      );
      const statusText = splitIntoLines(token.Status).map((l) =>
        hre.ethers.utils.formatBytes32String(l)
      );
      console.log(`Setting ${token.Index} – ${token.Title}`);
      const arrayToPush = Math.floor(index / 10);
      if (conceptArrays.length < arrayToPush + 1) conceptArrays.push([]);
      conceptArrays[arrayToPush].push(
        // Concept.Concept calldata _concept
        [
          token.TokenIdRangeStart, // uint256 _editionTokenRangeStart;
          token.Supply, // uint256 _editionSize;
          hre.ethers.utils.formatBytes32String(token.Title), // bytes32 _title;
          text, // bytes32[] _bodyText;
          [], // bytes32[] _smallPrintText;
          statusText, // bytes32[] _statusText;
        ]
      );
    }

    // Commit batches to chain
    for (let i = 0; i < conceptArrays.length; i++) {
      await BeefArtifact.setConceptData(conceptArrays[i]);
    }

    console.log("All Done!");
  }
);

function splitIntoLines(str) {
  const lines = [];
  let currentLine = "";

  // Split the string into an array of words
  const words = str.split(" ");

  // Iterate through the array of words
  for (const word of words) {
    // If the current line plus the next word would be too long,
    // push the current line to the lines array and start a new line
    if (currentLine.length + 1 + word.length > 31) {
      lines.push(currentLine);
      currentLine = "";
    }

    // Add the word to the current line
    currentLine += word + " ";
  }

  // Push the final line to the lines array
  lines.push(currentLine);

  return lines;
}
