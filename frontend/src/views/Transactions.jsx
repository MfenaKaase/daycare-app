import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchTransactions();
        
    }, []);

    const fetchTransactions = () => {
        axiosClient
            .get("/transactions")
            .then(({ data }) => {
                setTransactions(data.transactions);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            Transactions
            <table id="transactionsTable" className="table table-striped">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Reference</th>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.trx_ref}</td>
                            <td>{transaction.sender.name}</td>
                            <td>{transaction.receiver.name}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                            <td className="d-flex gap-2">
                                <Link className="btn btn-success mr-2" to="transaction/details"><i className="bi bi-eye"></i></Link>
                                <Link className="btn btn-primary" to="/transaction/add"><i className="bi bi-pen" ></i></Link>
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;
