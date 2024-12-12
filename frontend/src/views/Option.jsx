import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import Loading from "../components/Loading";

function Option() {
    const [trader, setTrader] = useState({});
    const [hasActiveLoans, setHasActiveLoans] = useState(false);
    const { userID } = useParams();

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
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="container">
            <div className="col-lg-6 col-12 mx-auto my-5">
                <div className="card py-5">
                    <div className="card-body">
                        <p className="text-bold">
                            Balance: NGN
                            <span className="display-3">
                                {trader.balance ?? <Loading />}
                            </span>
                        </p>
                        <h5 className="card-title">
                            What would{" "}
                            {trader.user ? (
                                <>{trader.user.name.split(" ")[0]}</>
                            ) : (
                                <Loading />
                            )}{" "}
                            like to do?
                        </h5>
                        <div className="col-12">
                            <Link
                                to={`/traders/${userID}/save`}
                                className="btn btn-lg btn-outline-success w-100 mb-5"
                            >
                                Save
                            </Link>
                        </div>
                        <div className="col-12">
                            <Link
                                to={`/traders/${userID}/withdraw`}
                                className="btn btn-lg btn-outline-primary w-100 mb-5"
                            >
                                Withdraw
                            </Link>
                        </div>
                        {!hasActiveLoans && (
                            <div className="col-12">
                                <Link
                                    to={`/traders/${userID}/loan`}
                                    className="btn btn-lg btn-outline-dark w-100"
                                >
                                    Loan
                                </Link>
                            </div>
                        )}

                        {hasActiveLoans && (
                            <div className="col-12">
                                <Link
                                    to={`/traders/${userID}/repay/loan`}
                                    className="btn btn-lg btn-outline-dark w-100"
                                >
                                    Repay Loan
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Option;
