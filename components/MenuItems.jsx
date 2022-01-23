import Link from "next/link";

const MenuItems = () => {
  return (
    <div className="flex space-x-5">
      <button key="/participants">
        <Link href="/">Participants</Link>
      </button>
      <button key="/expenses">
        <Link href="/expenses">Expenses</Link>
      </button>
    </div>
  );
};

export default MenuItems;
