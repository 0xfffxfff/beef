import type { NextPage } from "next";
import contract from "../../contracts/deployments/goerli/Beef.json";
import Head from "next/head";
const Series: NextPage = () => {
  return (
    <div id="concept" className="px-5 text-sm">
      {/* <h2 className="mt-8 mb-4">The BEEF Series</h2> */}
      <p className="mb-3">
        The BEEF Series is an artwork that examines the medium of NFTs and
        code-as-art in the tradition of conceptual art. Each piece states its
        own rules which augment ownership, transfers or other aspects of the
        individual token(s). These conditions, rules, and modifications are
        written directly into the contract – they are the artwork.
      </p>
      <p className="mb-3">
        Contract –{" "}
        <a
          href={`https://goerli.etherscan.io/address/${contract.address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contract.address} ↗
        </a>
      </p>
      <h2 className="mt-8 mb-4">Contributing & BEEF II</h2>
      <p className="mb-4">
        The next installments of the series are open for artists, contributors,
        and optimizoors.
        <br />I track proposals in this{" "}
        <a
          href="https://docs.google.com/spreadsheets/d/13BbCdUH_xfJGScEDaSL5SGlO5qD-2RDXt4OflWAKXcc/edit#gid=465487017"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <span className="underline">open&nbsp;sheet</span>&nbsp;↗
        </a>{" "}
        while contributions and PRs can be made to the{" "}
        <a
          href="https://github.com/0xfffxfff/Beef"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="underline">public&nbsp;repository</span>&nbsp;↗
        </a>
        . For this work I will not take any royalties and will forward all sales
        of contributed pieces to the contributors.
      </p>
      <p className="mt-8 mb-3">
        Signed,{" "}
        <a href="https://0xfff.love" target="_blank" rel="noopener noreferrer">
          0xfff.eth
        </a>
      </p>
      <Head>
        <title>BEEF - Read Me</title>
      </Head>
    </div>
  );
};

export default Series;
