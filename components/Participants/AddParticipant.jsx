import { useState } from "react";
import { Modal, notification } from "antd";
import { useWeb3ExecuteFunction, useChain, useMoralis } from "react-moralis";
import Addresses from "../../utils/addresses.json";
import ExpenseTracker from "../../utils/build/ExpenseTracker.json";
import Tok from "../../utils/build/TOK.json";

const AddParticipant = () => {
  const { Moralis } = useMoralis();
  const { abi: expenseTrackerAbi } = ExpenseTracker;
  const { abi: tokAbi } = Tok;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  /**
   * Adds Participant
   */
  const {
    error: addParticipantError,
    fetch: addParticipant,
    isLoading: isAddParticipantLoading,
  } = useWeb3ExecuteFunction({
    abi: expenseTrackerAbi,
    contractAddress: Addresses.expenseTracker,
    functionName: "addParticipant",
    params: {
      addr: address,
      name,
    },
  });

  /**
   * Mints a provided amount of TOK to the added participant
   */
  const {
    error: mintError,
    fetch: mint,
    isLoading: isMintLoading,
  } = useWeb3ExecuteFunction({
    abi: tokAbi,
    contractAddress: Addresses.token,
    functionName: "mint",
    params: {
      to: address,
      amount: Moralis.Units.ETH("0" + tokenAmount),
    },
  });

  const addParticipantAlert = (type) => {
    notification[type]({
      message: addParticipantError,
    });
  };

  const mintAlert = (type) => {
    notification[type]({
      message: mintError.message,
    });
  };

  return (
    <div>
      <button
        className="px-5 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
        onClick={() => setIsModalVisible(true)}
      >
        Add Participant
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
          Address
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border border-slate-200 rounded-full mb-5"
          />
        </label>

        <label className="flex flex-col items-center">
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-slate-200 rounded-full mb-5"
          />
        </label>

        <label className="flex flex-col items-center">
          Amount of TOK to mint
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
            onClick={() =>
              addParticipant({
                onError: () => addParticipantAlert("error"),
                onSuccess: () =>
                  mint({
                    onError: () => {
                      mintAlert("error");
                    },
                    onSuccess: () => {
                      setIsModalVisible(false);
                    },
                  }),
              })
            }
            className="px-5 py-2 bg-sky-500 text-white rounded-lg 
            hover:bg-sky-600 self-center"
            disabled={isAddParticipantLoading || isMintLoading}
          >
            Add Participant
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddParticipant;
