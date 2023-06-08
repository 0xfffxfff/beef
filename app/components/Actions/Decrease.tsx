import contract from "../../../contracts/deployments/goerli/Beef.json";
import {
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
  useNetwork,
} from "wagmi";
import type { Abi, Address } from "abitype";

const contractConfig = {
  address: contract.address as Address,
  abi: contract.abi as Abi,
};

export default function Decrease() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const enabled = isConnected && !chain?.unsupported;

  const { config: contractWriteConfig, isLoading: mintPrepLoading } =
    usePrepareContractWrite({
      ...contractConfig,
      functionName: "decrease",
      args: [],
      enabled,
      value: BigInt(0),
    });

  const { data: decreaseData, write: decrease } =
    useContractWrite(contractWriteConfig);

  async function action() {
    if (enabled) {
      await decrease?.();
    } else {
      window.open(
        `https://goerli.etherscan.io/address/${contract.address}#writeContract#F3`,
        "_blank"
      );
    }
  }

  return isConnected ? (
    <button
      type="button"
      onClick={action}
      disabled={!enabled}
      className={enabled ? "" : "text-neutral-400"}
    >
      → Decrease
    </button>
  ) : (
    <a
      href={`https://goerli.etherscan.io/address/${contract.address}#writeContract#F3`}
      target="_blank"
      rel="noreferrer noopener"
    >
      → Decrease
    </a>
  );
}
