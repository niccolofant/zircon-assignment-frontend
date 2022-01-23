import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import Participants from "../../components/Participants/Participants";

const participants = () => {
  const { asPath } = useRouter();

  const trackerAddress = asPath.substring(1, 43);

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
      <Participants address={trackerAddress} />
    </main>
  );
};

export default participants;
