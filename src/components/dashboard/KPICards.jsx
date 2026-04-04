import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown
} from "react-icons/fi";

export default function KPICards({ income, expenses, balance }) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* Balance */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-6 rounded-2xl">
        <div className="flex gap-2 items-center">
          <FiDollarSign/>
          Total Balance
        </div>
        <h2 className="text-4xl font-bold mt-2">
          ${balance.toLocaleString()}
        </h2>
      </div>

      {/* Income */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-2 items-center text-gray-500">
          <FiTrendingUp className="text-green-500"/>
          Income
        </div>
        <h2 className="text-3xl font-bold mt-3 text-green-600">
          ${income.toLocaleString()}
        </h2>
      </div>

      {/* Expenses */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex gap-2 items-center text-gray-500">
          <FiTrendingDown className="text-red-500"/>
          Expenses
        </div>
        <h2 className="text-3xl font-bold mt-3 text-red-600">
          ${expenses.toLocaleString()}
        </h2>
      </div>

    </div>
  );
}