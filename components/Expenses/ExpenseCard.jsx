import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../utils/helpers/formatters";
import { ArrowRightOutlined } from "@ant-design/icons";

const ExpenseCard = ({ debtor, payer, amount }) => {
  const { Moralis } = useMoralis();
  return (
    <div
      className="flex flex-col items-center border border-slate-200 
    rounded-lg p-5 space-y-3"
    >
      <div className="flex items-center space-x-5 font-semibold text-lg">
        <h1 className="text-red-600">{getEllipsisTxt(debtor, 4)}</h1>
        <ArrowRightOutlined />
        <h1 className="text-green-600">{getEllipsisTxt(payer, 4)}</h1>
      </div>

      <h3 className="font-bold text-xl">
        {Moralis.Units.FromWei(amount)}{" "}
        <span className="font-light text-sm text-slate-500">TOK</span>
      </h3>
    </div>
  );
};

export default ExpenseCard;
