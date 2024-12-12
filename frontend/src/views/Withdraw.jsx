import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";
import generateRandomString from "../generate-reference";
import { useStateContext } from "../contexts/ContextProvider";

export default function Withdraw() {
    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");
    const [balance, setBalance] = useState(null);
    const [reference, setReference] = useState("");
    const [trader, setTrader] = useState(null);
    const { userID } = useParams();
    const { user, setMessage } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [type, setType] = useState('bank')
    const navigate = useNavigate()

    useEffect(() => {
        fetchTrader();
    }, [userID]);

    const fetchTrader = () => {
        axiosClient
            .get(`/traders/${userID}`)
            .then(({ data }) => {
                setTrader(data.trader);
                setBalance(data.trader.balance);
                setReference(generateRandomString(10));
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
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data = {
            amount: amount,
            trader_id: userID,
            agent_id: user.id,
            reference: reference,
            type: type
        };

        axiosClient
            .post(`/withdrawals`, data)
            .then(({ data }) => {
                console.log(data);
                setBalance(data.trader.balance);
                setAmount(0);
                setIsLoading(false);
                setErrors([]);
                setMessage(`${data.trader.user.name}'s withdrawal is recorded`)
                navigate(`/withdrawals`);
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
                <form action="" onChange={(evt) => {setType(evt.target.value)}}>
                    <div className="form-group d-flex gap-5 jutify-content-center p-2">
                        
                        <label htmlFor="withdrawalType"><input type="radio" value="cash" name="withdrawalType"/>Cash</label>
                       
                        
                        <label htmlFor="withdrawalType"><input type="radio" value="bank" name="withdrawalType"/>bank</label>
                        
                    </div>
                </form>
                <div className="card py-5 bg-light">
                    <div className="card-body">
                        <div className="container mt-5">
                            <div className="row justify-content-center">
                               { type == 'bank' &&  <div className="col-md-6">
                                    <div
                                        className="account-info text-dark p-3 text-center"
                                        style={{
                                            background: 'rgba(114, 197, 208, 0.52)',
                                            borderRadius: '16px',
                                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                            // backdropFilter: 'blur(9.5px)',
                                            // WebkitBackdropFilter: 'blur(9.5px)',
                                            border: '1px solid rgba(114, 197, 208, 1)',
                                          }}
                                    >
                                        <p className="lead">
                                            {trader ?( trader.acct_name ? trader.acct_name.toUpperCase() : "") : ""}
                                        </p>

                                        <p className="display-5">
                                            {trader ? ( trader.acct_name ? trader.acct_no : "") : ""}
                                            <button className="btn" onClick={() => navigator.clipboard.writeText(trader ? trader.acct_no : "")}>
                                                <i className="bi bi-copy" title="copy account number"></i>
                                            </button>
                                        </p>
                                        <p>
                                            {trader ? ( trader.acct_name ? trader.bank : "") : ""}
                                        </p>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <Container>
                            <h1>Withdraw</h1>
                            {errors.length > 0 && <Errors errors={errors} />}
                            <p className="text-bold">
                                Balance: NGN
                                <span className="display-3">
                                    {trader ? (
                                        Math.round(balance - amount)
                                    ) : (
                                        <Loading />
                                    )}
                                </span>
                            </p>
                            <p className="text-bold">
                                Payment Ref:
                                <span className="">
                                    {reference ?? <Loading />}
                                </span>
                            </p>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-2">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step={100}
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        min={100}
                                        max={balance}
                                    />
                                </Form.Group>

                                {/* <Form.Group className="mb-2">
                                    <Form.Label>Reason</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter reason"
                                        value={reason}
                                        onChange={handleReasonChange}
                                        disabled
                                    />
                                </Form.Group> */}

                                <Button
                                    size="lg"
                                    variant="success"
                                    type="submit"
                                    className="mt-2 w-100"
                                    disabled={isLoading}
                                >
                                    <i className="bi bi-bell"></i> Notification {isLoading && <Loading />}
                                </Button>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
}
