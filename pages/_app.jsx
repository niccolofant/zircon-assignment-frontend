import "antd/dist/antd.css";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Layout from "../components/Layout";

const APP_ID = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const MyApp = ({ Component, pageProps }) => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
    );
  if (isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MoralisProvider>
    );
};

export default MyApp;
