import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer
} from "recharts";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { useState } from "react";

export default function Dashboard({
  transactions,
  role,
  addTransaction,
  deleteTransaction
}) {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = income - expenses;

  const [showForm, setShowForm] = useState(false);

  const chartData = transactions.map(t => ({
    date: t.date.slice(5),
    balance:
      t.type === "income" ? t.amount : -t.amount
  }));

  const handleAdd = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    addTransaction({
      date: form.get("date"),
      amount: Number(form.get("amount")),
      category: form.get("category"),
      type: form.get("type")
    });

    setShowForm(false);
    e.target.reset();
  };

  return (
    <div className="space-y-6">

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow">
          <p>Total Balance</p>
          <h2 className="text-3xl font-bold mt-2">${balance}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p>Income</p>
          <h2 className="text-3xl text-green-600 font-bold">${income}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p>Expenses</p>
          <h2 className="text-3xl text-red-600 font-bold">${expenses}</h2>
        </div>

      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">
          Balance Trend
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TRANSACTIONS */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Transactions</h2>

          {role === "admin" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
            >
              <FiPlus /> Add
            </button>
          )}
        </div>

        {/* ADD FORM */}
        {showForm && (
          <form onSubmit={handleAdd} className="flex gap-2 mb-4 flex-wrap">
            <input name="date" type="date" required className="border p-2 rounded" />
            <input name="amount" type="number" required placeholder="Amount" className="border p-2 rounded" />
            <input name="category" required placeholder="Category" className="border p-2 rounded" />

            <select name="type" className="border p-2 rounded">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button className="bg-green-600 text-white px-4 rounded">
              Save
            </button>
          </form>
        )}

        {/* TABLE */}
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              {role === "admin" && <th />}
            </tr>
          </thead>

          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-b hover:bg-gray-50">

                <td>{tx.date}</td>
                <td>{tx.category}</td>

                <td className={
                  tx.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }>
                  {tx.type === "income" ? "+" : "-"}${tx.amount}
                </td>

                {role === "admin" && (
                  <td>
                    <button
                      onClick={() => deleteTransaction(tx.id)}
                      className="text-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}