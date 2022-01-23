import { useState } from "react";
import { Modal, notification } from "antd";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";
import Addresses from "../../utils/addresses.json";
import ExpenseTracker from "../../utils/build/ExpenseTracker.json";

const AddExpense = () => {
  const { Moralis } = useMoralis();
  const { abi: expenseTrackerAbi } = ExpenseTracker;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [debtor, setDebtor] = useState("");
  const [payer, setPayer] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  /**
   * Add expense
   */
  const {
    error: addExpenseError,
    fetch: addExpense,
    isLoading: isAddExpenseLoading,
  } = useWeb3ExecuteFunction({
    abi: expenseTrackerAbi,
    contractAddress: Addresses.expenseTracker,
    functionName: "addExpense",
    params: {
      debtorAddr: debtor,
      payerAddr: payer,
      amount: Moralis.Units.ETH("0" + tokenAmount),
    },
  });

  /**
   * Error alert
   */
  const alert = (type) => {
    notification[type]({
      message: addExpenseError,
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsModalVisible(true)}
        className="px-5 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
      >
        Add Expense
      </button>

      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        onCancel={() => setIsModalVisible(false)}
        width="600px"
        className="p-10"
      >
        <label className="flex flex-col items-center">
          Debtor Address
          <input
            type="text"
            name="debtor"
            value={debtor}
            onChange={(e) => setDebtor(e.target.value)}
            className="p-2 border border-slate-200 rounded-full mb-5"
          />
        </label>

        <label className="flex flex-col items-center">
          Payer Address
          <input
            type="text"
            name="payer"
            value={payer}
            onChange={(e) => setPayer(e.target.value)}
            className="p-2 border border-slate-200 rounded-full mb-5"
          />
        </label>

        <label className="flex flex-col items-center">
          Debit amount (in TOK)
          <input
            type="number"
            name="amount"
            value={tokenAmount}
            min={1}
            onChange={(e) => setTokenAmount(e.target.value)}
            className="p-2 border border-slate-200 rounded-full mb-5"
          />
        </label>

        <div className="flex justify-center">
          <button
            onClick={() => {
              addExpense({
                onError: () => {
                  alert("error");
                },
                onSuccess: () => {
                  setIsModalVisible(false);
                },
              });
            }}
            disabled={isAddExpenseLoading}
            className="px-5 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
          >
            Add Expense
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddExpense;
