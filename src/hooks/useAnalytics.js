import { useMemo } from "react";

export default function useAnalytics(transactions) {

  return useMemo(() => {

    const sorted = [...transactions].sort(
      (a,b)=> new Date(a.date)-new Date(b.date)
    );

    let income = 0;
    let expenses = 0;

    const monthly = {};
    const weekly = {};

    const signed = t =>
      t.type === "income" ? t.amount : -t.amount;

    const getWeekKey = (dateStr) => {
      const d = new Date(dateStr);
      const first = new Date(d.getFullYear(),0,1);
      const days = Math.floor((d-first)/86400000);
      const week =
        Math.ceil((days + first.getDay()+1)/7);
      return `${d.getFullYear()}-W${week}`;
    };

    sorted.forEach(t=>{
      const val = signed(t);

      if(t.type==="income") income+=t.amount;
      else expenses+=t.amount;

      const month = t.date.slice(0,7);
      const week = getWeekKey(t.date);

      monthly[month]=(monthly[month]||0)+val;
      weekly[week]=(weekly[week]||0)+val;
    });

    const build = obj=>{
      let run=0;
      return Object.entries(obj)
        .sort(([a],[b])=>a.localeCompare(b))
        .map(([date,val])=>{
          run+=val;
          return {date,balance:run};
        });
    };

    return {
      income,
      expenses,
      balance: income-expenses,
      weeklyData: build(weekly),
      monthlyData: build(monthly)
    };

  },[transactions]);
}