import { FiTrash2, FiPlus, FiX,FiSearch, FiFilter } from "react-icons/fi";
import { useState } from "react";

export default function TransactionTable({
  transactions,
  role,
  addTransaction,
  deleteTransaction
}) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
const [filterType, setFilterType] = useState("all");

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

  const filteredTransactions = transactions.filter((tx) => {

  const matchesSearch =
    tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.date.includes(searchTerm) ||
    tx.amount.toString().includes(searchTerm);

  const matchesFilter =
    filterType === "all" || tx.type === filterType;

  return matchesSearch && matchesFilter;
});
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200">
      {/* Header with Search & Filter */}
      <div className="px-6 pt-5 pb-3 border-b border-gray-100 bg-white">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Search Input with icon */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm 
                         focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                         outline-none transition-all bg-gray-50/50 hover:bg-white 
                         placeholder:text-gray-400"
            />
          </div>

          {/* Filter Dropdown with icon */}
          <div className="relative w-full sm:w-44">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm 
                         focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                         outline-none transition-all bg-gray-50/50 hover:bg-white 
                         cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.25rem',
              }}
            >
              <option value="all">All transactions</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-800">Transactions</h2>
            <p className="text-sm text-gray-500 mt-0.5">Track all income and expenses</p>
          </div>
          {role === "admin" && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm 
                         bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                         shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <FiPlus size={16} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="px-6 py-5 bg-gray-50/80 border-b border-gray-100">
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                name="date"
                type="date"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 outline-none transition 
                           text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Amount ($)
              </label>
              <input
                name="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 outline-none transition 
                           text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <input
                name="category"
                placeholder="e.g., Groceries, Salary"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 outline-none transition 
                           text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                Type
              </label>
              <select
                name="type"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 outline-none transition 
                           text-sm bg-white"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 
                           rounded-xl hover:bg-gray-50 hover:border-gray-300 transition shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r 
                           from-blue-600 to-indigo-600 rounded-xl hover:shadow-md 
                           transition shadow-sm"
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
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="text-right px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              {role === "admin" && (
                <th className="text-center px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan={role === "admin" ? 4 : 3}
                  className="px-6 py-16 text-center"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                      📭
                    </div>
                    <p className="text-sm font-medium text-gray-500">No transactions yet</p>
                    {role === "admin" && (
                      <button
                        onClick={() => setShowForm(true)}
                        className="text-blue-600 text-xs font-semibold hover:underline mt-1"
                      >
                        + Add your first transaction
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-gray-50/80 transition-colors duration-150 group"
                >
                  <td className="px-6 py-3.5 text-gray-700 font-medium whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {tx.category}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-3.5 text-right font-semibold whitespace-nowrap ${
                      tx.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </td>
                  {role === "admin" && (
                    <td className="px-6 py-3.5 text-center whitespace-nowrap">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-gray-400 hover:text-red-500 transition-all duration-200 
                                   p-1.5 rounded-lg hover:bg-red-50"
                        aria-label="Delete transaction"
                      >
                        <FiTrash2 size={16} />
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