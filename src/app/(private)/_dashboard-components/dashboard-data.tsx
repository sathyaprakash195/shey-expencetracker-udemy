import React from "react";
import Statistics from "./statistics";
import Filters from "./filters";
import Analysis from "./analysis";
import { GetTransactions } from "@/server-actions/transactions";

async function DashboardData({ searchParams } = { searchParams: {} }) {
  const transactions = await GetTransactions(searchParams);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col h-96 items-center justify-center">
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706486400&semt=ais"
          alt=""
          height={200}
          width={250}
        />

        <h1 className="text-gray-600 text-lg font-bold">
          No transactions found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Filters searchParams={searchParams} />
      <Statistics transactions={transactions} />
      <Analysis transactions={transactions} />
    </div>
  );
}

export default DashboardData;
