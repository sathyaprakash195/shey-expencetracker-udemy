"use client";
import { TransactionType } from "@/interfaces";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

function Analysis({ transactions }: { transactions: TransactionType[] }) {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#12372A",
    "#637A9F",
    "#A94438",
    "#6DA4AA",
    "#F2C57C",
    "#F2A365",
  ];

  let finalAnalysisData: any = {
    income: {
      total: 0,
    },
    expense: {
      total: 0,
    },
  };

  transactions.forEach((transaction) => {
    finalAnalysisData[transaction.type].total += transaction.amount;
    if (finalAnalysisData[transaction.type][transaction.category]) {
      finalAnalysisData[transaction.type][transaction.category] +=
        transaction.amount;
    } else {
      finalAnalysisData[transaction.type][transaction.category] =
        transaction.amount;
    }
  });

  console.log(finalAnalysisData);

  let incomeAnalysisArray: any[] = [];

  Object.keys(finalAnalysisData.income).forEach((key, index) => {
    if (key === "total") return;
    let percentage =
      (finalAnalysisData.income[key] / finalAnalysisData.income.total) * 100;
    let objectAsPerPiechart = {
      name: key,
      value: percentage,
      amount: finalAnalysisData.income[key],
      color: COLORS[index],
    };
    incomeAnalysisArray.push(objectAsPerPiechart);
  });

  let expenseAnalysisArray: any[] = [];
  Object.keys(finalAnalysisData.expense).forEach((key, index) => {
    if (key === "total") return;
    let percentage =
      (finalAnalysisData.expense[key] / finalAnalysisData.expense.total) * 100;
    let objectAsPerPiechart = {
      name: key,
      value: percentage,
      amount: finalAnalysisData.expense[key],
      color: COLORS[index],
    };
    expenseAnalysisArray.push(objectAsPerPiechart);
  });

  const analysisdataToRender = [
    {
      title: "Income Analysis",
      data: incomeAnalysisArray,
    },
    {
      title: "Expense Analysis",
      data: expenseAnalysisArray,
    },
  ];

  return (
    <div className="mt-7">
      <div className="flex flex-col gap-5">
        {analysisdataToRender.map((analysisData) => (
          <div className="border border-gray-300 border-solid rounded-sm p-5">
            <h1 className="text-center text-lg text-gray-600">
              {analysisData.title}
            </h1>
            <div className="grid grid-cols-2 capitalize items-center">
              <PieChart width={800} height={400}>
                <Pie
                  data={analysisData.data}
                  cx={250}
                  cy={200}
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) =>
                    `${entry.name} (${entry.value.toFixed(2)}%)`
                  }
                >
                  {analysisData.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>

              <div className="flex flex-col gap-5">
                {analysisData.data.map((entry, index) => (
                  <div className="grid grid-cols-3 w-full text-sm text-gray-600">
                    <div className="flex gap-2 items-center">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span>{entry.name}</span>
                    </div>

                    <span>{entry.value.toFixed(2)}</span>

                    <span>$ {entry.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Analysis;
