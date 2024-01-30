import PageTitle from "@/components/page-title";
import React from "react";
import TransactionForm from "../../_common/transaction-form";
import TransactionModel from "@/models/transaction-model";

async function EditTransaction({ params }: { params: { id: string } }) {
  const transaction = await TransactionModel.findById(params.id);
  return (
    <div>
      <PageTitle title="Edit Transaction" />
      <TransactionForm
        isEdit={true}
        initialValues={JSON.parse(JSON.stringify(transaction))}
      />
    </div>
  );
}

export default EditTransaction;
