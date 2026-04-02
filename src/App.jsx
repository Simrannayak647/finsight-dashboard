import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

const initialTransactions = [
  { id: 1, date: '2026-03-25', amount: 1250, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-03-26', amount: 45.99, category: 'Groceries', type: 'expense' },
  { id: 3, date: '2026-03-27', amount: 200, category: 'Utilities', type: 'expense' },
  { id: 4, date: '2026-04-01', amount: 1250, category: 'Salary', type: 'income' },
];

export default function App() {

  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState("viewer");
  const [isOpen, setIsOpen] = useState(false);

  const addTransaction = (tx) =>
    setTransactions(prev => [{ id: Date.now(), ...tx }, ...prev]);

  const deleteTransaction = (id) =>
    setTransactions(prev => prev.filter(t => t.id !== id));

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} role={role} setRole={setRole} />

      <div className="flex-1 flex flex-col">

        <Navbar role={role} setRole={setRole} />

        <main className="p-6 overflow-y-auto">
          <Dashboard
            transactions={transactions}
            role={role}
            addTransaction={addTransaction}
            deleteTransaction={deleteTransaction}
          />
        </main>

      </div>
    </div>
  );
}