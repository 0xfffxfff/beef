import type { NextPage } from "next";
import Concept from "../components/Concept";
import Head from "next/head";

const Series: NextPage = () => {
  return (
    <div id="series" className="px-5">
      {[...Array(42)].map((v, index) => {
        return (
          <div className="mt-2 mb-10 lg:mb-16" key={index}>
            <Concept id={index + 1}></Concept>
          </div>
        );
      })}

      <Head>
        <title>BEEF by 0xfff</title>
      </Head>
    </div>
  );
};

export default Series;
