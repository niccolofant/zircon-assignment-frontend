import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../utils/helpers/formatters";
import { Modal } from "antd";
import { useState } from "react";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../utils/helpers/networks";
import { connectors } from "./config";
import Image from "next/image";

const Account = () => {
  const { authenticate, isAuthenticated, account, chainId, logout } =
    useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !account) {
    return (
      <>
        <div onClick={() => setIsAuthModalVisible(true)}>
          <button className="px-5 py-2 border border-slate-200 rounded-lg">
            Authenticate
          </button>
        </div>
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          width="340px"
        >
          <h1 className="text-center font-semibold text-xl">Connect Wallet</h1>
          <div className="grid grid-cols-2 gap-5">
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                className="flex flex-col items-center mt-5 border 
                border-slate-200 py-5 rounded-lg cursor-pointer"
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({ provider: connectorId });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <Image src={icon} alt={title} width="30" height="30" />
                <p>{title}</p>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalVisible(true)}
        className="px-5 py-2 border rounded-lg"
      >
        {getEllipsisTxt(account, 6)}
      </button>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        width="400px"
      >
        <div className="flex flex-col items-center">
          <div className="border border-slate-200 py-2 px-5 rounded-lg">
            <h1 className="text-xl font-semibold">
              {getEllipsisTxt(account, 6)}
            </h1>
            <div>
              <a
                href={`${getExplorer(chainId)}/address/${account}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm flex items-center"
              >
                <SelectOutlined className="mr-1" />
                View on Explorer
              </a>
            </div>
          </div>

          <button
            className="px-5 py-2 border border-slate-200 rounded-lg text-sm mt-5"
            onClick={async () => {
              await logout();
              window.localStorage.removeItem("connectorId");
              setIsModalVisible(false);
            }}
          >
            Disconnect Wallet
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Account;
