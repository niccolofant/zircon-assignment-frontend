import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import Addresses from "../utils/addresses.json";
import Tok from "../utils/build/TOK.json";

const Mint = ({ address }) => {
  const { Moralis } = useMoralis();
  const { abi: tokAbi } = Tok;

  /**
   * Mints 1000 TOK to provided address
   */
  const { fetch: mint } = useWeb3ExecuteFunction({
    abi: tokAbi,
    contractAddress: Addresses.token,
    functionName: "mint",
    params: {
      to: address,
      amount: Moralis.Units.ETH("1000"),
    },
  });

  return (
    <div>
      <button
        className="px-3 py-1 bg-green-500 text-white text-xs font-light mb-2 
        rounded-full hover:bg-green-600"
        onClick={() => mint()}
      >
        Mint 1000 TOK
      </button>
    </div>
  );
};

export default Mint;
