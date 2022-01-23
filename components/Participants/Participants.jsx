import { useEffect } from "react";
import { useWeb3ExecuteFunction, useChain } from "react-moralis";
import Addresses from "../../utils/addresses.json";
import ExpenseTracker from "../../utils/build/ExpenseTracker.json";
import ParticipantCard from "./ParticipantCard";
import AddParticipant from "./AddParticipant";

const Participants = () => {
  const { chainId } = useChain();
  const { abi } = ExpenseTracker;

  useEffect(() => {
    if (chainId) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  /**
   * Fetch infos
   */
  const { data, fetch } = useWeb3ExecuteFunction({
    abi,
    contractAddress: Addresses.expenseTracker,
    functionName: "getInfo",
    params: {},
  });

  return (
    <div>
      <AddParticipant />
      <div className="grid grid-cols-3 py-5 gap-10">
        {data &&
          data[2].map((address, index) => (
            <div key={index}>
              <ParticipantCard
                address={address}
                name={data[3][index]}
                balance={data[4][index]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Participants;
