import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const ReceiptCard = ({
    companyName,
    amount,
    personName,
    balance,
    date,
    reference,
    acctName,
    acctNo,
    bank,
    type,
    cashOrBank,
}) => {
    return (
        <div class="card-body profile-card pt-4 d-flex flex-column align-items-start bg-light rounded-3 shadow">
            <h2 class="display-5 text-primary text-center">{companyName}</h2>
            --------------------------------------------------
            <h3 class="text-primary text-center">{type}</h3>
            --------------------------------------------------
            <div class="info-section">
                <h3 class="text-muted">
                    Amount:{" "}
                    <span class="fw-bold text-success">NGN {amount}</span>
                </h3>
                <h3 class="text-muted">
                    Name: <span class="fw-bold">{personName}</span>
                </h3>
                <h3 class="text-muted">
                    Balance:{" "}
                    <span class="fw-bold text-warning">NGN {balance}</span>
                </h3>
                <h3 class="text-muted">
                    Date:{" "}
                    <span class="fw-bold">
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                </h3>
                {type != "saving" && (
                    <>
                        {(cashOrBank == 'bank' && type =="withdral") &&
                            (<>
                                <h3 class="text-muted">
                                    Acct No:{" "}
                                    <span class="fw-bold">{acctNo}</span>
                                </h3>
                                <h3 class="text-muted">
                                    Acct Name:{" "}
                                    <span class="fw-bold">{acctName}</span>
                                </h3>
                                <h3 class="text-muted">
                                    Bank: <span class="fw-bold">{bank}</span>
                                </h3>
                            </>)
                        }

                        
                    </>
                )}
                <h3 class="text-muted">
                    Ref: <span class="fw-bold">{reference}</span>
                </h3>
            </div>
            <button
                className="btn btn-lg btn-dark print-btn"
                onClick={() => {
                    window.print();
                }}
            >
                Print
            </button>
        </div>
    );
};

export default ReceiptCard;
