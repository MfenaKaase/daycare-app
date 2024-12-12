import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";

const RepayLoan = () => {
    const [amount, setAmount] = useState("");
    const [trader, setTrader] = useState("");
    const { userID } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [hasActiveLoans, setHasActiveLoans] = useState(false);
    const [loanID, setLoanID] = useState(null)
    const [loanBalance, setLoanBalance] = useState(null)
    const {setMessage} = useStateContext()

    useEffect(() => {
        fetchTrader();
    }, [userID]);

    const fetchTrader = () => {
        axiosClient
            .get(`/traders/${userID}`)
            .then(({ data }) => {
                console.log(data);
                setTrader(data.trader);
                setHasActiveLoans(data.hasActiveLoans);
                setHasActiveLoans(data.hasActiveLoans);
                if(data.loans) {
                    setLoanID(data.loans.id)
                    setLoanBalance(data.loans.balance)
                }
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            amount: amount,
            trader_id: userID,
            loan_id: loanID          
        };

        axiosClient
            .post(`/loanRepayments`, data)
            .then(({ data }) => {
                console.log(data);
                setLoanBalance(data.loan.balance)
                setIsLoading(false);
                setAmount(0)
                // setErrors([]);
                setMessage(`${data.trader.user.name}'s payment of ${amount} was successful! Balance: ${loanBalance}`)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                const response = err.response;
                if (response && response.status === 422) {
                    // setErrors(response.data.errors);
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <div className="container">
            <div className="col-lg-6 col-12 mx-auto my-5">
                <div className="card py-5">
                    <div className="card-body">
                        <Container>
                            <h1>Repay Loan</h1>
                            Loan Balance: NGN{loanBalance - amount}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Loan Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step={100}
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        disabled={!hasActiveLoans}
                                        max={loanBalance}
                                    />
                                </Form.Group>

                                {hasActiveLoans && (
                                    <Button
                                        size="lg"
                                        variant="success"
                                        type="submit"
                                        className="mt-2 w-100 d-flex align-items-center justify-content-center"
                                        disabled={isLoading}
                                    >
                                        Pay {isLoading && <Loading />}
                                    </Button>
                                )}
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RepayLoan;
