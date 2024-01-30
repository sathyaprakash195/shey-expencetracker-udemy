import LinkButton from "@/components/link-button";
import React, { Suspense } from "react";
import DashboardData from "./_dashboard-components/dashboard-data";
import PageTitle from "@/components/page-title";
import Loader from "@/components/loader";

async function Homepage({ searchParams }: { searchParams: any }) {
  const suspenseKey = JSON.stringify(searchParams);
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Dashboard" />
        <LinkButton title="Transactions" path="/transactions" />
      </div>

      <Suspense
        fallback={
          <div className="h-40">
            <Loader />
          </div>
        }
        key={suspenseKey}
      >
        <DashboardData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Homepage;
