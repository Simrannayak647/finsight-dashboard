import { FiTrash2, FiPlus, FiX } from "react-icons/fi";
import { useState } from "react";

export default function TransactionTable({
  transactions,
  role,
  addTransaction,
  deleteTransaction
}) {
  const [showForm, setShowForm] = useState(false);

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

  // Calculate totals for summary
  const totalIncome = transactions
    .filter(tx => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions
    .filter(tx => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header Section */}
      <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
            <p className="text-sm text-gray-500 mt-0.5">Track all income and expenses</p>
          </div>
          {role === "admin" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                showForm 
                  ? "bg-gray-100 text-gray-700 hover:bg-gray-200" 
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow"
              }`}
            >
              {showForm ? <FiX size={16} /> : <FiPlus size={16} />}
              {showForm ? "Cancel" : "Add Transaction"}
            </button>
          )}
        </div>

        {/* Summary Cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          <div className="bg-green-50 rounded-xl px-4 py-3 border border-green-100">
            <p className="text-xs font-medium text-green-700 uppercase tracking-wide">Total Income</p>
            <p className="text-2xl font-bold text-green-700">${totalIncome.toFixed(2)}</p>
          </div>
          <div className="bg-red-50 rounded-xl px-4 py-3 border border-red-100">
            <p className="text-xs font-medium text-red-700 uppercase tracking-wide">Total Expenses</p>
            <p className="text-2xl font-bold text-red-700">${totalExpense.toFixed(2)}</p>
          </div>
          <div className={`rounded-xl px-4 py-3 border ${
            balance >= 0 ? "bg-blue-50 border-blue-100" : "bg-orange-50 border-orange-100"
          }`}>
            <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? "text-blue-700" : "text-orange-700"}`}>
              ${balance.toFixed(2)}
            </p>
          </div>
        </div> */}
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="px-6 py-5 bg-gray-50 border-b border-gray-100">
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
              <input
                name="date"
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Amount ($)</label>
              <input
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <input
                name="category"
                placeholder="e.g., Groceries, Salary"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
              <select
                name="type"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm bg-white"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Save Transaction
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
              {role === "admin" && (
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 4 : 3}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">📭</span>
                    <p className="text-sm">No transactions yet</p>
                    {role === "admin" && (
                      <button
                        onClick={() => setShowForm(true)}
                        className="text-blue-600 text-xs font-medium hover:underline mt-1"
                      >
                        + Add your first transaction
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-3 text-gray-700 font-medium whitespace-nowrap">{tx.date}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`px-6 py-3 text-right font-semibold whitespace-nowrap ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </td>
                  {role === "admin" && (
                    <td className="px-6 py-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-1 rounded-md hover:bg-red-50"
                        aria-label="Delete transaction"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}