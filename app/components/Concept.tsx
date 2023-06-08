import { PropsWithChildren, useEffect, useRef, useState } from "react";
import contract from "../../contracts/deployments/mainnet/Beef.json";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useAccount,
  useNetwork,
} from "wagmi";
import { ethers } from "ethers";
import Increase from "./Actions/Increase";
import Decrease from "./Actions/Decrease";
import type { Abi, Address } from "abitype";

const contractConfig = {
  address: contract.address as Address,
  abi: contract.abi as Abi,
};

export default function Concept({ id }: PropsWithChildren<{ id: number }>) {
  const ref = useRef();
  const isOnScreen = useOnScreen(ref, "200px");
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [owner, setOwner] = useState<String>();
  const open = true,
    openIsLoading = false;

  const { data: ownerOf, isFetched: ownerOfIsLoaded } = useContractRead({
    ...contractConfig,
    functionName: "ownerOf",
    args: [id],
    enabled: isOnScreen,
    watch: isOnScreen,
  });

  useEffect(() => {
    if (ownerOf) setOwner(String(ownerOf));
  }, [ownerOf]);

  const {
    data: render,
    isFetched: renderIsFetched,
    refetch: renderFetch,
  } = useContractRead({
    functionName: "renderSVGBase64",
    ...contractConfig,
    args: [id],
    enabled: !!open && isOnScreen,
    watch: false,
  });

  const {
    config: contractWriteConfig,
    isLoading: mintPrepLoading,
    error: prepError,
    isSuccess: mintPossible,
    isFetched: mintFetched,
  } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "mint",
    args: [id],
    value: id === 29 ? ethers.parseEther("1.1") : ethers.parseEther("0.1"),
    enabled: !owner && isOnScreen,
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const errorMessage = prepError?.message;
  let message = "";
  const mintableInTheory = ownerOfIsLoaded && !ownerOf && mintFetched;

  if (!mintableInTheory) {
    message = "Not Mintable";
  } else if (!errorMessage) {
    message = "Mintable";
  } else if (errorMessage.includes("err: insufficient funds for")) {
    message = "Insufficient funds to mint";
  } else if (
    errorMessage.includes("HalfOfTheTime()") ||
    errorMessage.includes("CurrentlyClosed()")
  ) {
    message = "Mintable at the right time";
  } else if (
    errorMessage.includes("NotContinuous()") ||
    errorMessage.includes("NotContract()") ||
    errorMessage.includes("NoBeef()") ||
    errorMessage.includes("MutuallyExclusive()") ||
    errorMessage.includes("NotDark()") ||
    errorMessage.includes("NotLight()") ||
    errorMessage.includes("NotCoinbase()") ||
    errorMessage.includes("NotChromatic()") ||
    errorMessage.includes("reverted for an unknown reason")
  ) {
    message = "Mintable with eligible adress";
  } else if (errorMessage) {
    message =
      errorMessage?.substring(0, 26) + (errorMessage?.length > 26 ? "…" : "");
  } else {
    message = "Mintable";
  }
  const mintableStatusText = message;

  async function clickAcquire() {
    await mint?.();
    await renderFetch();
  }

  return (
    <div className="relative" ref={ref} id={String(id)}>
      <div className="relative pb-[121%] bg-[#f8f8f8]">
        <img
          src={render ? String(render) : `/render/${id}.svg`}
          className="absolute w-full top-0 right-0 left-0"
        ></img>
      </div>
      <div className="flex flex-row gap-2 justify-between text-sm relative mt-2">
        {chain?.unsupported ? null : open ? (
          <>
            <div className="flex flex-row gap-2 justify-start relative">
              {mintPrepLoading ? (
                <>
                  <div
                    className={`relative top-[6px] bg-white border-black border-dotted border h-2 w-2 rounded-full`}
                  ></div>
                  <span className="text-black">
                    Loading data from contract…
                  </span>
                </>
              ) : (
                <>
                  {ownerOfIsLoaded && ownerOf ? (
                    <div
                      className={`relative top-[6px] bg-red-600 h-2 w-2 rounded-full`}
                    ></div>
                  ) : mint ? (
                    <div
                      className={`relative top-[6px] bg-black h-2 w-2 rounded-full`}
                    ></div>
                  ) : (
                    <div
                      className={`relative top-[6px] bg-white border-black border h-2 w-2 rounded-full`}
                    ></div>
                  )}
                  {/* <div>TokenID {id}</div> */}
                  {ownerOf ? (
                    <div>
                      <a
                        href={`https://etherscan.io/nft/${contract.address}/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Current Owner:{" "}
                        {typeof ownerOf === "string"
                          ? ownerOf.substring(0, 6) +
                            "…" +
                            ownerOf.substring(
                              ownerOf.length - 4,
                              ownerOf.length
                            )
                          : "Loading…"}
                      </a>
                    </div>
                  ) : null}
                  {isConnected && ownerOfIsLoaded && !ownerOf ? (
                    <>
                      <button
                        type="button"
                        onClick={clickAcquire}
                        // className="bg-gray-200 pt-1.5 pb-1 px-3 disabled:bg-neutral-100 disabled:text-neutral-400"
                        disabled={!mint}
                      >
                        {mint ? (
                          `Mint / ${
                            id === 40 /* UNWIELDY */ ? "1.1 ETH" : "0.1 ETH"
                          }`
                        ) : (
                          <>
                            <span>{mintableStatusText}</span>
                          </>
                        )}
                      </button>
                      {mint && (id === 14 || id === 15 || id === 16) ? (
                        <div>⚠ Danger: Risk of losing ETH</div>
                      ) : null}
                      {mint && id === 9 ? (
                        <div>⚠ Danger: Requires a lot of ETH</div>
                      ) : null}
                      {mint && id === 7 ? (
                        <div>
                          ⚠ Danger: Price might differ from marketplaces
                        </div>
                      ) : null}
                    </>
                  ) : (
                    <div>{ownerOfIsLoaded && !ownerOf ? "Mintable" : null}</div>
                  )}
                </>
              )}
            </div>
            {/* Actions */}
            <div>
              {id === 27 ? <Increase /> : null}
              {id === 1 ? (
                <a
                  href={`https://etherscan.io/address/${contract.address}#writeContract#F13`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Transfer
                </a>
              ) : null}
              {id === 7 ? (
                <a
                  href={`https://etherscan.io/address/${contract.address}#writeContract#F2`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Buy
                </a>
              ) : null}
              {id === 21 ? (
                <a
                  href={`https://etherscan.io/address/${contract.address}#readContract#F21`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  → Where Am I?
                </a>
              ) : null}
              {id === 19 ? <Decrease /> : null}
            </div>
          </>
        ) : (
          <div className="flex flex-row gap-2 justify-start relative">
            <div
              className={`relative top-[6px] bg-black h-2 w-2 rounded-full`}
            ></div>
            <span>{openIsLoading ? "Loading…" : "Mintable Soon™"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function useOnScreen(ref: any, rootMargin = "0px") {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }
    );
    if (ref?.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
