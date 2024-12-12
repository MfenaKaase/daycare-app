import ReceiptCard from '../components/ReceiptCard'
import "../index.css"
import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axiosClient from '../axios-client';

function LoanReceipt() {

    const { loanID } = useParams();
      const [receipt, setReceipt] = useState({})
  
      useEffect(() => {
          fetchReceipt();
      }, [loanID]);
  
      const fetchReceipt = () => {
          axiosClient
              .get(`/loans/${loanID}/receipt`)
              .then(({ data }) => {
                  console.log(data);
                  setReceipt(data);
                  
              })
              .catch((err) => {
                  console.log(err);
              });
      };
  
    return (
      <div className='receipt-container mx-auto' style={{
        maxWidth: 300 + 'px',
        height: 400 + 'px'
     }}>
           <ReceiptCard 
          companyName="Gray Financial"
          amount={receipt.amount}
          personName={receipt.name}
          balance={receipt.balance}
          date={receipt.date}
          reference={receipt.reference}
          acctName={receipt.acctName}
          acctNo={receipt.acctNo}
          bank={receipt.bank}
          type="Loan"
        />
      </div>
    )
  }
  
  export default LoanReceipt