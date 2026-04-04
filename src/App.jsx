import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";

const initialTransactions=[
  {id:1,date:'2026-03-25',amount:1250,category:'Salary',type:'income'},
  {id:2,date:'2026-03-26',amount:45.99,category:'Groceries',type:'expense'},
  {id:3,date:'2026-03-27',amount:200,category:'Utilities',type:'expense'},
  {id:4,date:'2026-04-01',amount:1250,category:'Salary',type:'income'},
];

export default function App(){

  const [transactions,setTransactions]=useState(initialTransactions);
  const [role,setRole]=useState("viewer");
  const [isOpen,setIsOpen]=useState(false);

  const addTransaction=(tx)=>
    setTransactions(prev=>[{id:Date.now(),...tx},...prev]);

  const deleteTransaction=id=>
    setTransactions(prev=>prev.filter(t=>t.id!==id));

  return(
    <div className="flex h-screen">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

      <div className="flex-1 flex flex-col">

        <Navbar
          role={role}
          setRole={setRole}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <main className="flex-1 overflow-y-auto p-6">
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