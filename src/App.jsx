import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
    <div style={{display:"flex"}}>
      <Sidebar />

      <div style={{flex:1}}>
        <Navbar />
        <Dashboard />
      </div>
    </div>
    </div>

  );
}

export default App;