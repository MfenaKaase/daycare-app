import ReceiptCard from '../components/ReceiptCard'
import "../index.css"
import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axiosClient from '../axios-client';

function WithdrawalReceipt() {

    const { withdrawalID } = useParams();
      const [receipt, setReceipt] = useState({})
  
      useEffect(() => {
          fetchReceipt();
      }, [withdrawalID]);
  
      const fetchReceipt = () => {
          axiosClient
              .get(`/withdrawals/${withdrawalID}/receipt`)
              .then(({ data }) => {
                  console.log(data);
                  setReceipt(data);
                  
              })
              .catch((err) => {
                  console.log(err);
              });
      };
  
    return (
      <div className='receipt-container mx-auto'  style={{
        maxWidth: 300 + "px",
        height: "fit-content",
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
          type="withdrawal"
          cashOrBank={receipt.type}
        />
        
      </div>
    )
  }
  
  export default WithdrawalReceipt
