import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import React, { Suspense } from "react";
import TransactionsData from "./_common/transactions-data";
import Filters from "@/components/filters";
import Loader from "@/components/loader";

function Transactions({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Transactions" />
        <LinkButton title="Add Transaction" path="/transactions/add" />
      </div>

      <Filters />

      <Suspense
        key={suspenseKey}
        fallback={
          <div className="h-40">
            <Loader />
          </div>
        }
      >
        <TransactionsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Transactions;
