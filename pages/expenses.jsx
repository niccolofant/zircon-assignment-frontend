import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Expenses from "../components/Expenses/Expenses";

const expenses = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <main className="py-5">
      <Expenses />
    </main>
  );
};

export default expenses;
