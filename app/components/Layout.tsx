import { PropsWithChildren } from "react";
import { useContractRead } from "wagmi";
import type { Abi, Address } from "abitype";
import { Connect } from "./Connect";

import contract from "../../contracts/deployments/mainnet/Beef.json";
import Link from "next/link";

const contractConfig = {
  address: contract.address as Address,
  abi: contract.abi as Abi,
};

export const Layout = ({ children }: PropsWithChildren) => {
  const { data: totalSupply, isSuccess: totalSupplyIsLoaded } = useContractRead(
    {
      ...contractConfig,
      functionName: "totalSupply",
      args: [],
      watch: true,
    }
  );
  const { data: editionSize, isSuccess: editionSizeIsLoaded } = useContractRead(
    {
      ...contractConfig,
      functionName: "editionSize",
      args: [],
      watch: true,
    }
  );

  return (
    <div>
      <div className="content relative min-h-full mt-16 lg:mt-28 mb-16 lg:mb-28">
        {children}
      </div>
      <div
        className="absolute md:fixed top-2 right-2 text-sm"
        id="connectWrapper"
      >
        <Connect />
      </div>
      <div className="absolute md:fixed top-5 left-5 text-sm flex flex-col">
        <Link href="/">BEEF</Link>
        {/* <div className="text-xs hmd:grid-cols-2 hlg:grid-cols-1 gap-x-2 hidden hmd:grid fixed top-1/2 transform -translate-y-1/2 max-h-[calc(100vh-120px)]">
          {[...Array(42)].map((v, index) => {
            const id = index + 1;
            const isBeef =
              id === 4 ||
              id === 8 ||
              id === 12 ||
              id === 23 ||
              id === 32 ||
              id === 35 ||
              id === 36 ||
              id === 37;
            return (
              <a
                href={`#${id}`}
                style={isBeef ? { color: "#BA2219" } : undefined}
              >
                {id}
              </a>
            );
          })}
        </div> */}
      </div>
      <div className="absolute md:fixed left-1/2 transform -translate-x-1/2 md:translate-x-0 top-5 md:top-auto md:bottom-5 md:left-5 text-sm flex flex-col">
        <Link href="/readme">README</Link>
      </div>
      {totalSupplyIsLoaded && editionSizeIsLoaded ? (
        <div className="hidden lg:block absolute lg:fixed bottom-5 right-5 text-sm">
          {Number(totalSupply)} / {Number(editionSize)}
        </div>
      ) : null}
    </div>
  );
};
