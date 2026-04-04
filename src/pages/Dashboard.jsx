import { useState } from "react";
import useAnalytics from "../hooks/useAnalytics";
import KPICards from "../components/dashboard/KPICards";
import BalanceChart from "../components/dashboard/BalanceChart";
import TransactionTable from "../components/dashboard/TransactionTable";

export default function Dashboard(props){

  const {transactions}=props;

  const analytics = useAnalytics(transactions);

  const [view,setView]=useState("weekly");

  return (
    <div className="space-y-8">

      <KPICards {...analytics}/>

      <BalanceChart
        view={view}
        setView={setView}
        weeklyData={analytics.weeklyData}
        monthlyData={analytics.monthlyData}
      />

      <TransactionTable {...props}/>

    </div>
  );
}