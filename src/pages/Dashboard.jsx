import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { FiTrash2, FiPlus, FiDollarSign, FiTrendingUp, FiTrendingDown, FiX } from "react-icons/fi";
import { useState } from "react";
import { useMemo } from "react";

export default function Dashboard({
  transactions,
  role,
  addTransaction,
  deleteTransaction
}) {
  
  const { income, expenses, balance } = useMemo(() => {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses
  };
}, [transactions]);

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("weekly");
  const total = income + expenses;

const sortedTransactions = useMemo(() => {
  return [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}, [transactions]);

  // Prepare chart data (cumulative balance over time)
 let cumulative = 0;

const chartData = sortedTransactions.map(t => {
  cumulative += t.type === "income" ? t.amount : -t.amount;

  return {
    date: t.date.slice(5),
    balance: cumulative
  };
});

const { weeklyData, monthlyData } = useMemo(() => {

  /* ---------- MONTHLY ---------- */
  const monthly = {};
  let monthRunning = 0;

  sortedTransactions.forEach(t => {
    const key = t.date.slice(0,7);

    if (!monthly[key])
      monthly[key] = { date: key, amount: 0 };

    monthly[key].amount +=
      t.type === "income" ? t.amount : -t.amount;
  });

  const monthlyData = Object.values(monthly)
    .sort((a,b)=>a.date.localeCompare(b.date))
    .map(m => {
      monthRunning += m.amount;
      return { date: m.date, balance: monthRunning };
    });


  /* ---------- WEEKLY ---------- */
  const weekly = {};
  let weekRunning = 0;

  sortedTransactions.forEach(t => {
    const d = new Date(t.date);
    const week =
      d.getFullYear() + "-W" + Math.ceil(d.getDate()/7);

    if (!weekly[week])
      weekly[week] = { date: week, amount: 0 };

    weekly[week].amount +=
      t.type === "income" ? t.amount : -t.amount;
  });

  const weeklyData = Object.values(weekly)
    .sort((a,b)=>a.date.localeCompare(b.date))
    .map(w => {
      weekRunning += w.amount;
      return { date: w.date, balance: weekRunning };
    });

  return { weeklyData, monthlyData };

}, [sortedTransactions]);


const displaydata = view === "weekly" ? weeklyData : monthlyData;

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
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      
      {/* KPI CARDS - Modern Glassmorphic Gradient Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Balance Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12" />
          <div className="relative p-6 text-white">
            <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
              <FiDollarSign size={18} />
              <span>Total Balance</span>
            </div>
            <h2 className="text-4xl font-bold mt-2 tracking-tight">
              ${balance.toLocaleString()}
            </h2>
            <p className="text-white/60 text-xs mt-3">Updated just now</p>
          </div>
        </div>

        {/* Income Card */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                <FiTrendingUp size={18} className="text-green-500" />
                <span>Total Income</span>
              </div>
              <div className="px-2 py-1 bg-green-50 rounded-full">
                <span className="text-green-600 text-xs font-semibold">+12%</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-3 text-gray-800">
              ${income.toLocaleString()}
            </h2>
            <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${(income / (income + expenses || 1)) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
          <div className="p-6">
            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <FiTrendingDown size={18} className="text-red-500" />
              <span>Total Expenses</span>
            </div>
            <h2 className="text-3xl font-bold mt-3 text-gray-800">
              ${expenses.toLocaleString()}
            </h2>
            <div className="mt-4 flex justify-between text-xs text-gray-400">
              <span>vs last month</span>
              <span className="text-red-500">+3%</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Balance Trend</h3>
            <p className="text-sm text-gray-400">Last 30 days performance</p>
          </div>
          <div className="flex gap-2">
            <button
  onClick={() => setView("weekly")}
  className={`px-3 py-1 text-xs rounded-full ${
    view === "weekly"
      ? "text-blue-600 bg-blue-50"
      : "text-gray-500 hover:bg-gray-100"
  }`}
>
  Weekly
</button>

<button
  onClick={() => setView("monthly")}
  className={`px-3 py-1 text-xs rounded-full ${
    view === "monthly"
      ? "text-blue-600 bg-blue-50"
      : "text-gray-500 hover:bg-gray-100"
  }`}
>
  Monthly
</button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={displaydata}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              formatter={(value) => [`$${value}`, 'Balance']}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#3b82f6" 
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* TRANSACTIONS SECTION */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {transactions.length} entries • Last updated {new Date().toLocaleDateString()}
            </p>
          </div>
          
          {role === "admin" && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FiPlus size={16} />
              {showForm ? "Cancel" : "Add Transaction"}
            </button>
          )}
        </div>

        {/* ADD FORM - Enhanced styling */}
        {showForm && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                <input 
                  name="date" 
                  type="date" 
                  required 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Amount ($)</label>
                <input 
                  name="amount" 
                  type="number" 
                  required 
                  placeholder="0.00" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
                <input 
                  name="category" 
                  required 
                  placeholder="e.g., Groceries" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                <select 
                  name="type" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FiPlus size={16} /> Save
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TABLE - Modern minimal design */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-right">Amount</th>
                {role === "admin" && <th className="px-6 py-3 text-center w-12"></th>}
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={role === "admin" ? 4 : 3} className="px-6 py-12 text-center text-gray-400">
                    No transactions yet. Add your first one!
                  </td>
                </tr>
              ) : (
                transactions.map((tx, idx) => (
                  <tr key={tx.id} className={`border-b border-gray-100 hover:bg-gray-50 transition ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{tx.date}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {tx.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
                      {tx.type === "income" ? "+" : "-"}${Math.abs(tx.amount).toLocaleString()}
                    </td>
                    {role === "admin" && (
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-50"
                          aria-label="Delete"
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
        
        {/* Optional footer with summary */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
          <span>Showing all transactions</span>
          <span>Total: {transactions.length} items</span>
        </div>
      </div>
    </div>
  );
}