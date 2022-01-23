import { getEllipsisTxt } from "../../utils/helpers/formatters";
import { useState, useEffect } from "react";
import { useWeb3ExecuteFunction, useChain, useMoralis } from "react-moralis";
import { Alert, Statistic } from "antd";
import Mint from "../Mint";
import Addresses from "../../utils/addresses.json";
import Tok from "../../utils/build/TOK.json";

const ParticipantCard = ({ address, name, balance }) => {
  const { chainId } = useChain();
  const { Moralis } = useMoralis();
  const { abi: tokAbi } = Tok;

  const [allowance, setAllowance] = useState("");

  /**
   * Saves the allowance
   */
  useEffect(() => {
    if (address && chainId)
      fetch({
        onSuccess: (data) => {
          setAllowance(Moralis.Units.FromWei(data));
        },
      });
  }, [chainId]);

  /**
   * Check allowance of that particular user
   */
  const { data, fetch } = useWeb3ExecuteFunction({
    abi: tokAbi,
    contractAddress: Addresses.token,
    functionName: "allowance",
    params: {
      owner: address,
      spender: Addresses.expenseTracker,
    },
  });

  return (
    <div className="border border-slate-200 rounded-lg p-5 space-y-3">
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl">{getEllipsisTxt(address, 4)}</h1>
        <h5 className="text-base font-light text-slate-500">{name}</h5>
      </div>

      <div className="flex justify-between items-end">
        <Statistic
          title="Balance (TOK)"
          value={Moralis.Units.FromWei(balance)}
          precision={2}
        />
        <Mint address={address} />
      </div>

      {data && allowance < Moralis.Units.FromWei(balance) ? (
        <Alert
          message={`Needs approval of ${
            Moralis.Units.FromWei(balance) - Moralis.Units.FromWei(data)
          } TOK`}
          type="error"
          showIcon
        />
      ) : (
        <Alert message="Approved" type="success" showIcon />
      )}
    </div>
  );
};

export default ParticipantCard;
