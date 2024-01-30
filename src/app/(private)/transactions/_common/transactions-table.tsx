"use client";
import { TransactionType } from "@/interfaces";
import { Button, Table, message } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useRouter } from "next/navigation";
import { DeleteTransaction } from "@/server-actions/transactions";

function TransactionsTable({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  const router = useRouter();
  const [loading = false, setLoading] = React.useState<boolean>(false);

  const deleteTransaction = async (transactionId: string) => {
    try {
      setLoading(true);
      const response = await DeleteTransaction(transactionId);
      if (response.error) {
        throw new Error(response.error);
      }
      message.success(response.message);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render(date: string) {
        return dayjs(date).format("MMM DD, YYYY");
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render(amount: number) {
        return `$${amount}`;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
      render(value: any, record: TransactionType) {
        return (
          <div className="flex gap-5">
            <Button size="small" onClick={() => deleteTransaction(record._id)}>
              <i className="ri-delete-bin-line"></i>
            </Button>
            <Button
              size="small"
              onClick={() => router.push(`/transactions/edit/${record._id}`)}
            >
              <i className="ri-pencil-line"></i>
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="capitalize">
      <Table dataSource={transactions} columns={columns} loading={loading} />
    </div>
  );
}

export default TransactionsTable;
