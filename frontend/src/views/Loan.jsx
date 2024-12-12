import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import Errors from "../components/Errors";

const Loan = () => {
    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");
    const [trader, setTrader] = useState("");
    const { userID } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [hasActiveLoans, setHasActiveLoans] = useState(false);
    const [errors, setErrors] = useState([])
    const [balance, setBalance] = useState(null)
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
                if(data.hasActiveLoans != null) {
                    setBalance(data.loans.balance)
                }
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };
    const handleReasonChange = (e) => {
        setReason(e.target.value);
    };
    const handleDepositChange = (e) => {
        setDeposit(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            amount: amount,
            trader_id: userID,
            purpose: reason ? reason : 'loan',
            interest_rate: 10,
            status: "active",
            balance: amount
        };

        axiosClient
            .post(`/loans`, data)
            .then(({ data }) => {
                console.log(data);
                setIsLoading(false);
                setErrors([]);
                setMessage(`${data.trader.user.name}'s loan was recorded successfully`)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <div className="container">
            <div className="col-lg-6 col-12 mx-auto my-5">
                { Object.keys(errors) > 0 && <Errors errors={errors}/>}
                <div className="card py-5">
                    <div className="card-body">
                        <Container>
                            <h1>Loan Application</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Loan Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step={100}
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        disabled={hasActiveLoans}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-2">
                                    <Form.Label>Reason for Loan</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter reason"
                                        value={reason}
                                        onChange={handleReasonChange}
                                        disabled={hasActiveLoans}
                                    />
                                </Form.Group>

                                {!hasActiveLoans && (
                                    <Button
                                        size="lg"
                                        variant="success"
                                        type="submit"
                                        className="mt-2 w-100 d-flex align-items-center"
                                        disabled={isLoading}
                                    >
                                        Get Loan {isLoading && <Loading />}
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
export default Loan;
