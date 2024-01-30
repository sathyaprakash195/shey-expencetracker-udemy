import PageTitle from '@/components/page-title'
import React from 'react'
import TransactionForm from '../_common/transaction-form'

function AddTransactionPage() {
  return (
    <div>
      <PageTitle title="Add Transaction" />
      <TransactionForm />
    </div>
  )
}

export default AddTransactionPage