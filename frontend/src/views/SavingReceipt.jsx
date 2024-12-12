import ReceiptCard from "../components/ReceiptCard";
import "../index.css";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosClient from "../axios-client";

function SavingReceipt() {
    const { savingID } = useParams();
    const [receipt, setReceipt] = useState({});

    useEffect(() => {
        fetchReceipt();
    }, [savingID]);

    const fetchReceipt = () => {
        axiosClient
            .get(`/savings/${savingID}`)
            .then(({ data }) => {
                console.log(data);
                setReceipt(data.saving);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div
                className="receipt-container mx-auto"
                style={{
                    maxWidth: 300 + "px",
                    height: "fit-content",
                }}
            >
                <ReceiptCard
                    companyName="Gray Financial"
                    amount={receipt.amount}
                    personName={receipt.trader ? receipt.trader.user.name : ""}
                    balance={receipt.trader ? receipt.trader.balance : ""}
                    date={receipt.created_at}
                    reference={receipt.reference}
                    type="Saving"
                />
                
            </div>
        </>
    );
}

export default SavingReceipt;
