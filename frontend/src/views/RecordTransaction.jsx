import React, { useRef, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Loading from "../components/Loading";
import Errors from "../components/Errors";

function RecordTransaction() {
    const dateRef = useRef();
    const amountRef = useRef();

    const { user, token } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const [agents, setAgents] = useState([]);
    const [trxRef, setTrxRef] = useState('');
    const [selectedAgent,  setSelectedAgent] = useState(null);

    useEffect(() => {
        fetchAgents();
        setTrxRef(generateRandomString(10));
    }, []);

    const handleAgentChange = (event) => {
        const agentId = parseInt(event.target.value, 10);
        const selected = agents.find(agent => agent.id === agentId);
        setSelectedAgent(selected);
      };

    const fetchAgents = () => {
        axiosClient
            .get("/agents")
            .then(({ data }) => {
                setAgents(data.agents);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const generateRandomString = (length) => {
        const charset =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset.charAt(randomIndex);
        }

        return randomString;
    };

    const handleSubmit = (evt) => {
        setIsLoading(true);
        evt.preventDefault();
        const payload = {
            trx_ref: trxRef,
            date: dateRef.current.value,
            sender_id: selectedAgent.id,
            receiver_id: user.id,
            amount: amountRef.current.value,
        };

        console.log(payload);

        axiosClient
            .post("/transactions", payload)
            .then(({ data }) => {
                setIsLoading(false);
                setErrors([]);
                dateRef.current.value = '';
                amountRef.current.value = '';
                return <Navigate to="/transactions" />;
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                    // console.log(response.data.errors)
                }
            });
    };

    return (
        <div className="container">
            <div className="col-lg-6 col-12 mx-auto my-5">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Record a Transaction</h5>
                        <Errors errors={errors} />
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">
                                    Transaction Reference
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="trx"
                                    value={trxRef}
                                    disabled
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="inputEmail4"
                                    className="form-label"
                                >
                                    Date
                                </label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="date"
                                    ref={dateRef}
                                />
                            </div>
                            <div className="col-12">
                                <label htmlFor="agentSelect">
                                    Select Agent:
                                </label>
                                <select
                                    id="agentSelect"
                                    onChange={handleAgentChange}
                                    value={
                                        selectedAgent ? selectedAgent.id : ""
                                    }
                                    className="form-control"
                                >
                                    <option value="" disabled>
                                        Select an agent
                                    </option>
                                    {agents.map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.name}
                                        </option>
                                    ))}
                                </select>

                                {selectedAgent && (
                                    <div>
                                        <p>
                                            Selected Agent: {selectedAgent.name}
                                        </p>
                                        {/* You can display additional information about the selected agent here */}
                                    </div>
                                )}
                            </div>
                            <div className="col-12">
                                <label htmlFor="amount" className="form-label">
                                    Amount
                                </label>
                                <input
                                    type="number"
                                    step={5}
                                    className="form-control"
                                    id="amount"
                                    ref={amountRef}
                                />
                            </div>
                        
                            <div className="d-flex align-items-center">
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary d-flex align-items-center"
                                    disabled={isLoading}
                                >
                                    Save {isLoading && <Loading />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecordTransaction;
