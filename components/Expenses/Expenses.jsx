import { useEffect, useState } from "react";
import { useWeb3ExecuteFunction, useChain } from "react-moralis";
import Addresses from "../../utils/addresses.json";
import ExpenseTracker from "../../utils/build/ExpenseTracker.json";
import ExpenseCard from "./ExpenseCard";
import AddExpense from "./AddExpense";
import Calculate from "../Calculate.jsx";

const Expenses = () => {
  const { chainId } = useChain();
  const { abi } = ExpenseTracker;

  useEffect(() => {
    if (Addresses.expenseTracker && chainId) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Addresses.expenseTracker, chainId]);

  const { data, fetch } = useWeb3ExecuteFunction({
    abi,
    contractAddress: Addresses.expenseTracker,
    functionName: "getInfo",
    params: {},
  });

  return (
    <div>
      <div className="flex justify-between">
        <AddExpense />
        <Calculate />
      </div>

      <div className="grid grid-cols-3 py-5 gap-10">
        {data &&
          data[5].map((debtor, index) => (
            <div key={index}>
              <ExpenseCard
                debtor={debtor}
                payer={data[6][index]}
                amount={data[7][index]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Expenses;
