import contract from "../../../contracts/deployments/mainnet/Beef.json";
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
export default function Increase() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const enabled = isConnected && !chain?.unsupported;

  const { config: contractWriteConfig, isLoading: mintPrepLoading } =
    usePrepareContractWrite({
      ...contractConfig,
      functionName: "increase",
      args: [],
      enabled,
      value: BigInt(0),
    });

  const { data: increaseData, write: increase } =
    useContractWrite(contractWriteConfig);

  async function action() {
    if (enabled) {
      await increase?.();
    } else {
      window.open(
        `https://etherscan.io/address/${contract.address}#writeContract#F4`,
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
      → Increase
    </button>
  ) : (
    <a
      href={`https://etherscan.io/address/${contract.address}#writeContract#F4`}
      target="_blank"
      rel="noreferrer noopener"
    >
      → Increase
    </a>
  );
}
