import React from "react";
import Statistics from "./statistics";
import Filters from "./filters";
import Analysis from "./analysis";
import { GetTransactions } from "@/server-actions/transactions";

async function DashboardData({ searchParams } = { searchParams: {} }) {
  const transactions = await GetTransactions(searchParams);

  return (
    <div>
      <Filters searchParams={searchParams} />
      <Statistics transactions={transactions} />
      <Analysis transactions={transactions} />
    </div>
  );
}

export default DashboardData;
