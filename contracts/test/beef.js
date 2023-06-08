const { expect, assert } = require("chai");
const { ethers, network } = require("hardhat");
const { assertErrorMessage } = require("./util/custom-assert");
const { waitBlocks } = require("./util/wait-blocks");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const tokenIndex = require("../tokenindex.json");

const PERMISSIONLESS = 1;
// const NO_EXTERNALITIES = 2;
const OPENING_HOURS = 3;
const DEAD_BEEF = 4;
const MUTUAL_A = 5;
const MUTUAL_B = 6;
const FAIR_PRICE = 7;
const BEEF_BABE = 8;
const SATED = 9;
const DARK = 10;
const RETRACTED = 11;
const BAD_BEEF = 12;
// const EOA = 13;
const SAMEBLOCK_I = 14;
const SAMEBLOCK_II = 15;
const SAMEBLOCK_III = 16;
const LIMITED_USE = 17;
const DEAF_BABE = 18;
const DECREASE = 19;
// const SECRET_POEM = 20;
const LOCUS = 21;
const PERMANENCE_I = 22;
const BEEF_BEEF = 23;
const DEPENDENT_A = 24;
const DEPENDENT_B = 25;
const LIGHT = 26;
const INCREASE = 27;
const DEAD_BABE = 28;
const CONTINUOUS = 29;
// const SECRET_JOKE = 30;
const PERMANENCE_II = 31;
const DEAF_BEEF = 32;
// const MAXIMALISM = 33;
const COINBASE = 34;
const BABE_BEEF = 35;
const BEEF_FACE = 36;
const FEED_BEEF = 37;
// const SECRET_TRUTH = 38;
const CHROMATIC = 39;
const UNWIELDY = 40;
const BAD_BABE = 41;
const TRANSITORY_OWNERSHIP = 42;

describe("Beef", function () {
  let beef, Beef;
  let signers, owner, addr1, addr2, addr3, addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    signers = await ethers.getSigners();
    [owner, addr1, addr2, addr3, ...addrs] = signers;
    Beef = await ethers.getContractFactory("Beef");

    beef = await Beef.deploy();
    await beef.deployed();

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
      // console.log(`Setting ${token.Index} – ${token.Title}`)
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
      await beef.setConceptData(conceptArrays[i]);
    }
  });

  // describe("Check Metadata and Render", function () {
  //   it("Should return the correctly rendered SVG", async function () {
  //     await beef.mint(20, { value: ethers.utils.parseEther('0.1') });
  //     const base64 = await beef.tokenURI(20);
  //     console.log()
  //     console.log(base64)
  //     console.log()
  //   })
  // })

  describe("BEEF", function () {
    const tokens = [
      {
        id: DEAD_BEEF,
        minterAddress: "0xDEaD01123581321345589144233377610987bEEf",
      },
      {
        id: BEEF_BEEF,
        minterAddress: "0xBeef01123581321345589144233377610987bEeF",
      },
      {
        id: FEED_BEEF,
        minterAddress: "0xFeed01123581321345589144233377610987BeeF",
      },
      {
        id: DEAF_BEEF,
        minterAddress: "0xdEaF01123581321345589144233377610987Beef",
      },
      {
        id: BAD_BEEF,
        minterAddress: "0xBAd011235813213455891442333776109871BEef",
      },
      {
        id: BEEF_FACE,
        minterAddress: "0xbeeF01123581321345589144233377610987FAcE",
      },
      {
        id: BABE_BEEF,
        minterAddress: "0xBAbe01123581321345589144233377610987Beef",
      },
      {
        id: BEEF_BABE,
        minterAddress: "0xBeeF01123581321345589144233377610987BaBe",
      },
      {
        id: BAD_BABE,
        minterAddress: "0xbaD011235813213455891442333776109871bABe",
      },
      {
        id: DEAF_BABE,
        minterAddress: "0xdEAF01123581321345589144233377610987bAbE",
      },
      {
        id: DEAD_BABE,
        minterAddress: "0xdeAD01123581321345589144233377610987bABE",
      },
    ];
    it("Should not be mintable with regular addresses", async function () {
      for (const token of tokens) {
        await assertErrorMessage(
          beef.mint(token.id, { value: ethers.utils.parseEther("0.1") }),
          "NoBeef()"
        );
        const minter = await ethers.getImpersonatedSigner(token.minterAddress);
        await owner.sendTransaction({
          to: minter.address,
          value: ethers.utils.parseEther("1"),
        });
        await beef.connect(minter).mint(token.id, {
          value: ethers.utils.parseEther("0.1"),
        });
      }
    });
  });

  describe("SAME BLOCK", function () {
    let [A, B, C] = [SAMEBLOCK_I, SAMEBLOCK_II, SAMEBLOCK_III];
    afterEach(async () => {
      await network.provider.send("evm_setAutomine", [true]);
    });
    it("Should be mintable and transferable", async function () {
      // The three pieces from this edition can only be transferred in the same block
      await network.provider.send("evm_setAutomine", [false]);
      await beef.connect(signers[0]).mint(A, {
        value: ethers.utils.parseEther("0.1"),
      });
      await beef.connect(signers[1]).mint(B, {
        value: ethers.utils.parseEther("0.1"),
      });
      await beef.connect(signers[2]).mint(C, {
        value: ethers.utils.parseEther("0.1"),
      });
      await network.provider.send("hardhat_mine", ["0x4"]);
      expect(await beef.ownerOf(A)).to.equal(signers[0].address);
      await network.provider.send("evm_setAutomine", [true]);
      await beef
        .connect(signers[0])
        .transferFrom(signers[0].address, signers[4].address, A);
      await beef
        .connect(signers[1])
        .transferFrom(signers[1].address, signers[4].address, B);
      await beef
        .connect(signers[2])
        .transferFrom(signers[2].address, signers[4].address, C);
      expect(await beef.ownerOf(C)).to.equal(signers[2].address);
      await network.provider.send("evm_setAutomine", [false]);
      await beef
        .connect(signers[0])
        .transferFrom(signers[0].address, signers[10].address, A);
      await beef
        .connect(signers[1])
        .transferFrom(signers[1].address, signers[11].address, B);
      await beef
        .connect(signers[2])
        .transferFrom(signers[2].address, signers[12].address, C);
      await network.provider.send("hardhat_mine", ["0x4"]);
      expect(await beef.ownerOf(A)).to.equal(signers[10].address);
      await network.provider.send("evm_setAutomine", [true]);
    });
  });

  describe("CODEPENDENT", function () {
    let [A, B] = [DEPENDENT_A, DEPENDENT_B];
    // The two pieces of this edition are co-dependent. A piece can only be acquired if the first three
    // and last three digits of both the owning addresses are smaller than or equal to 0xFFF = 4095
    it("Should be mintable and transferable", async function () {
      await beef.connect(signers[13]).mint(A, {
        value: ethers.utils.parseEther("0.1"),
      });
      await expect(
        beef.mint(B, { value: ethers.utils.parseEther("0.1") })
      ).to.be.revertedWith("Codependent");
      await beef.connect(signers[2]).mint(B, {
        value: ethers.utils.parseEther("0.1"),
      });
      expect(await beef.balanceOf(signers[2].address)).to.equal(1);
      expect(await beef.balanceOf(signers[13].address)).to.equal(1);
      await expect(
        beef
          .connect(signers[13])
          .transferFrom(signers[13].address, signers[0].address, A)
      ).to.be.revertedWith("Codependent");
      await beef
        .connect(signers[13])
        .transferFrom(signers[13].address, signers[10].address, A);
      expect(await beef.ownerOf(A)).to.equal(signers[10].address);
    });
  });

  describe("MUTUALLY EXCLUSIVE", function () {
    let [A, B] = [MUTUAL_A, MUTUAL_B];
    it("Should be mintable and transferable", async function () {
      await beef.connect(signers[0]).mint(A, {
        value: ethers.utils.parseEther("0.1"),
      });
      await assertErrorMessage(
        beef.connect(signers[2]).mint(B, {
          value: ethers.utils.parseEther("0.1"),
        }),
        "MutuallyExclusive()"
      );
      await beef.connect(signers[13]).mint(B, {
        value: ethers.utils.parseEther("0.1"),
      });
      await beef
        .connect(signers[13])
        .transferFrom(signers[13].address, signers[16].address, B);
      await assertErrorMessage(
        beef
          .connect(signers[16])
          .transferFrom(signers[16].address, signers[5].address, B),
        "MutuallyExclusive()"
      );
      await assertErrorMessage(
        beef
          .connect(signers[0])
          .transferFrom(signers[0].address, signers[15].address, A),
        "MutuallyExclusive()"
      );
    });
  });

  describe("FAIR PRICE", function () {
    it("Should be mintable and buyable", async function () {
      await beef.connect(signers[0]).mint(FAIR_PRICE, {
        value: ethers.utils.parseEther("0.1"),
      });
      await beef.connect(signers[1]).buyAtFairPrice({
        value: ethers.utils.parseEther("0.11"),
      });
      await beef.connect(signers[0]).buyAtFairPrice({
        value: ethers.utils.parseEther("0.12"),
      });
      await assertErrorMessage(
        beef.connect(signers[0]).buyAtFairPrice({
          value: ethers.utils.parseEther("0.12"),
        }),
        "NotFairPrice()"
      );
      await beef.connect(signers[1]).buyAtFairPrice({
        value: ethers.utils.parseEther("0.15"),
      });
      await beef.connect(signers[1]).buyAtFairPrice({
        value: ethers.utils.parseEther("1"),
      });
      await assertErrorMessage(
        beef.connect(signers[0]).buyAtFairPrice({
          value: ethers.utils.parseEther("0.9"),
        }),
        "NotFairPrice()"
      );
      await beef.connect(signers[1]).buyAtFairPrice({
        value: ethers.utils.parseEther("1000"),
      });
      await beef.connect(signers[0]).buyAtFairPrice({
        value: ethers.utils.parseEther("1001"),
      });
    });
  });

  describe("INCREASE AND DECREASE", function () {
    let [A, B] = [INCREASE, DECREASE];
    it("Should be mintable and transferable", async function () {
      await beef.mint(A, { value: ethers.utils.parseEther("0.1") });
      await beef.increase();
      await beef.decrease();
      await beef.connect(signers[13]).increase();
      await beef.connect(signers[13]).decrease();
      await beef.connect(signers[5]).mint(B, {
        value: ethers.utils.parseEther("0.1"),
      });
    });
  });

  describe("LIGHT AND DARK", function () {
    const tokens = [
      {
        id: LIGHT,
        minterAddress: "0xf7AF9FA37AFBffF3C92EFFff7Ef8fAfB81f7baaF",
        error: "",
      },
      {
        id: DARK,
        minterAddress: "0x07a090A37a0B0003C92E00007E080A0B8107BAa0",
        error: "",
      },
    ];
    it("Should not be mintable with regular addresses", async function () {
      for (const token of tokens) {
        await expect(
          beef.mint(token.id, { value: ethers.utils.parseEther("0.1") })
        ).to.be.revertedWith(token.error);
        const minter = await ethers.getImpersonatedSigner(token.minterAddress);
        await owner.sendTransaction({
          to: minter.address,
          value: ethers.utils.parseEther("1"),
        });
        await beef.connect(minter).mint(token.id, {
          value: ethers.utils.parseEther("0.1"),
        });
      }
    });
  });

  describe("CHROMATIC", function () {
    const tokens = [
      {
        id: CHROMATIC,
        minterAddress: "0x0123456789AbCDEF01123581321345589144233f",
        error: "",
      },
    ];
    it("Should not be mintable with regular addresses", async function () {
      for (const token of tokens) {
        await expect(
          beef.mint(token.id, { value: ethers.utils.parseEther("0.1") })
        ).to.be.revertedWith(token.error);
        const minter = await ethers.getImpersonatedSigner(token.minterAddress);
        await owner.sendTransaction({
          to: minter.address,
          value: ethers.utils.parseEther("1"),
        });
        await beef.connect(minter).mint(token.id, {
          value: ethers.utils.parseEther("0.1"),
        });
      }
    });
  });

  describe("UNWIELDY", function () {
    let [A] = [UNWIELDY];
    it("Should not only be mintable and transferrable with 1 ETH burn value", async function () {
      await expect(beef.mint(A)).to.be.revertedWith("");
      await expect(
        beef.mint(A, { value: ethers.utils.parseEther("0.1") })
      ).to.be.revertedWith("");
      await expect(
        beef.mint(A, { value: ethers.utils.parseEther("1") })
      ).to.be.revertedWith("");
      await beef.mint(A, { value: ethers.utils.parseEther("1.1") });
      await expect(
        beef.transferFrom(owner.address, addr1.address, A)
      ).to.be.revertedWith("");
      await expect(
        beef.transferFrom(owner.address, addr1.address, A, {
          value: ethers.utils.parseEther("0.1"),
        })
      ).to.be.revertedWith("");
      beef.transferFrom(owner.address, addr1.address, A, {
        value: ethers.utils.parseEther("1"),
      });
    });
  });

  describe("COINBASE", function () {
    let [A] = [COINBASE];
    it("Should only be mintable by coinbase", async function () {
      await expect(
        beef.mint(A, { value: ethers.utils.parseEther("0.1") })
      ).to.be.revertedWith("");
      await network.provider.send("hardhat_setCoinbase", [owner.address]);
      await beef.mint(A, { value: ethers.utils.parseEther("0.1") });
      await expect(
        beef.transferFrom(owner.address, addr1.address, A)
      ).to.be.revertedWith("");
      await network.provider.send("hardhat_setCoinbase", [addr1.address]);
      beef.transferFrom(owner.address, addr1.address, A);
    });
  });

  describe("LIMITED_USE", function () {
    it("Should burn after 7 uses", async function () {
      await beef.mint(LIMITED_USE, { value: ethers.utils.parseEther("0.1") });
      await beef.transferFrom(
        signers[0].address,
        signers[1].address,
        LIMITED_USE
      );
      await beef
        .connect(signers[1])
        .transferFrom(signers[1].address, signers[0].address, LIMITED_USE);
      await beef.transferFrom(
        signers[0].address,
        signers[1].address,
        LIMITED_USE
      );
      await beef
        .connect(signers[1])
        .transferFrom(signers[1].address, signers[0].address, LIMITED_USE);
      await beef.transferFrom(
        signers[0].address,
        signers[1].address,
        LIMITED_USE
      );
      await beef
        .connect(signers[1])
        .transferFrom(signers[1].address, signers[0].address, LIMITED_USE);
      await beef.transferFrom(
        signers[0].address,
        signers[1].address,
        LIMITED_USE
      );
      expect(await beef.ownerOf(LIMITED_USE)).to.equal(
        "0x000000000000000000000000000000000000dEaD"
      );
    });
  });

  describe("PERMISSIONLESS", function () {
    it("Should allow transfer by anyone", async function () {
      await beef.mint(PERMISSIONLESS, {
        value: ethers.utils.parseEther("0.1"),
      });
      await beef
        .connect(signers[1])
        .transferFrom(signers[0].address, signers[3].address, PERMISSIONLESS);
      await beef
        .connect(signers[4])
        ["safeTransferFrom(address,address,uint256)"](
          signers[3].address,
          signers[2].address,
          PERMISSIONLESS
        );
      await beef
        .connect(signers[4])
        ["safeTransferFrom(address,address,uint256,bytes)"](
          signers[2].address,
          signers[4].address,
          PERMISSIONLESS,
          [0x0]
        );
    });
  });

  describe("PERMANENCE", function () {
    it("Should have semi-permanence", async function () {
      let hasMintedOne = false;
      let hasMintedTwo = false;
      for (let i = 0; i < 4; i++) {
        await waitBlocks(hre, Math.round(1 + Math.random() * 3));

        let blocknumber = (await ethers.provider.getBlock("latest")).number + 1;
        if (!hasMintedOne) {
          if (blocknumber % 2 == 1 /* It transacts in the next block */) {
            await beef.mint(PERMANENCE_I, {
              value: ethers.utils.parseEther("0.1"),
            });
            hasMintedOne = true;
          } else {
            await assertErrorMessage(
              beef.mint(PERMANENCE_I, {
                value: ethers.utils.parseEther("0.1"),
              }),
              "HalfOfTheTime()"
            );
          }
        } else {
          if (blocknumber % 2 == 0 /* It views the current block */) {
            expect(await beef.ownerOf(PERMANENCE_I)).to.equal(
              signers[0].address
            );
          } else {
            // TODO: Investigate reverts in view functions bug
            // await expect(beef.ownerOf(PERMANENCE_I)).to.be.revertedWith('Half of the time')
          }
        }
        blocknumber = (await ethers.provider.getBlock("latest")).number + 1;
        if (!hasMintedTwo) {
          if (blocknumber % 2 == 0 /* It transacts in the next block */) {
            await beef.mint(PERMANENCE_II, {
              value: ethers.utils.parseEther("0.1"),
            });
            hasMintedTwo = true;
          } else {
            await assertErrorMessage(
              beef.mint(PERMANENCE_II, {
                value: ethers.utils.parseEther("0.1"),
              }),
              "HalfOfTheTime()"
            );
          }
        } else {
          if (blocknumber % 2 == 1 /* It views the current block */) {
            expect(await beef.ownerOf(PERMANENCE_II)).to.equal(
              signers[0].address
            );
          } else {
            // TODO: Investigate reverts in view functions bug
            // expect(await beef.ownerOf(PERMANENCE_II)).to.be.revertedWith('Half of the time')
          }
        }
      }
    });
  });

  describe("OPENING_HOURS", function () {
    it("Should have opening hours", async function () {
      let timestamp = await helpers.time.latest();
      let currentHour = Math.floor((timestamp % (24 * 3600)) / 3600);

      // advance to opening hours (ish)
      while (currentHour >= 16 || currentHour < 10) {
        await helpers.time.increase(3600);
        timestamp = await helpers.time.latest();
        currentHour = Math.floor((timestamp % (24 * 3600)) / 3600);
      }

      // Mint
      await beef.mint(OPENING_HOURS, { value: ethers.utils.parseEther("0.1") });

      // Test every hour
      for (let i = 0; i < 24; i++) {
        timestamp = await helpers.time.latest();
        let currentTime = timestamp % (24 * 3600);
        if (currentTime >= 9 * 3600 && currentTime <= 17 * 3600) {
          expect(await beef.ownerOf(OPENING_HOURS)).to.equal(
            signers[0].address
          );
        } else {
          try {
            await beef.ownerOf(OPENING_HOURS);
            assert.fail();
          } catch (error) {
            assert(true, "Good");
          }
        }

        await helpers.time.increase(3600);
      }
    });
  });

  describe("CONTINUOUS", function () {
    it("Should only be transferrable to continuous addresses", async function () {
      const minter0 = await ethers.getImpersonatedSigner(
        "0x0000000000000000000000000000000000000aBc"
      );
      const minter1 = await ethers.getImpersonatedSigner(
        "0xAbC0000000000000000000000000000000000dEF"
      );
      const minter2 = await ethers.getImpersonatedSigner(
        "0xDeF0000000000000000000000000000000000123"
      );
      const minter3 = await ethers.getImpersonatedSigner(
        "0x1230000000000000000000000000000000000456"
      );
      await owner.sendTransaction({
        to: minter0.address,
        value: ethers.utils.parseEther("1"),
      });
      await owner.sendTransaction({
        to: minter1.address,
        value: ethers.utils.parseEther("1"),
      });
      await owner.sendTransaction({
        to: minter2.address,
        value: ethers.utils.parseEther("1"),
      });
      await owner.sendTransaction({
        to: minter3.address,
        value: ethers.utils.parseEther("1"),
      });
      await beef.connect(minter0).mint(CONTINUOUS, {
        value: ethers.utils.parseEther("0.1"),
      });
      await beef
        .connect(minter0)
        .transferFrom(minter0.address, minter1.address, CONTINUOUS);
      await beef
        .connect(minter1)
        .transferFrom(minter1.address, minter2.address, CONTINUOUS);
      await beef
        .connect(minter2)
        .transferFrom(minter2.address, minter3.address, CONTINUOUS);
      await expect(
        beef
          .connect(minter3)
          .transferFrom(minter3.address, signers[0].address, CONTINUOUS)
      ).to.be.reverted;
    });
  });

  describe("RETRACTED", function () {
    it("Should allow retracting", async function () {
      await beef.connect(signers[1]).mint(RETRACTED, {
        value: ethers.utils.parseEther("0.1"),
      });
      await beef.retract();
      expect(await beef.ownerOf(RETRACTED)).to.equal(signers[0].address);
    });
  });

  describe("TRANSITORY_OWNERSHIP", function () {
    it("Should always be owned by the current coinbase address", async function () {
      let block = await ethers.provider.getBlock("latest");
      expect(await beef.ownerOf(TRANSITORY_OWNERSHIP)).to.be.equal(block.miner);
      await beef.updateTransitory();
    });
  });

  describe("SATED", function () {
    it("Should use all gas", async function () {
      waitBlocks(hre, 1);
      await beef.mint(SATED, {
        value: ethers.utils.parseEther("0.1"),
        gasLimit: 30_000_000,
      });
    });
  });
});

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
