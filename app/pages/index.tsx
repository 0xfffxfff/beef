import type { NextPage } from "next";
import Concept from "../components/Concept";
import Head from "next/head";

const Series: NextPage = () => {
  return (
    <div id="series" className="px-5">
      {[...Array(42)].map((v, index) => {
        const id = index + 1;
        return (
          <div className="mt-2 mb-10 lg:mb-16" key={index}>
            <Concept id={id}></Concept>
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
