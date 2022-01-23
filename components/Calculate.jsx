import { notification } from "antd";
import { useWeb3ExecuteFunction } from "react-moralis";
import Addresses from "../utils/addresses.json";
import ExpenseTracker from "../utils/build/ExpenseTracker.json";

const Calculate = () => {
  const { abi: expenseTrackerAbi } = ExpenseTracker;

  /**
   * Calculates minimum cash flow and send transactions
   */
  const { error, fetch: calculate } = useWeb3ExecuteFunction({
    abi: expenseTrackerAbi,
    contractAddress: Addresses.expenseTracker,
    functionName: "calculate",
    params: {},
  });

  const alert = (type) => {
    notification[type]({
      message: error.message,
    });
  };

  return (
    <div>
      <button
        onClick={() =>
          calculate({
            onError: () => alert("error"),
          })
        }
        className="px-5 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
      >
        Calculate minimum cash flow
      </button>
    </div>
  );
};

export default Calculate;
