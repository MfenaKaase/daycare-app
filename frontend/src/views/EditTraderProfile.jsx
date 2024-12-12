import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Loading from "../components/Loading";
import Errors from "../components/Errors";

function EditTraderProfile() {
    const { userID } = useParams();
    const nameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef(null);
    const bankRef = useRef(null);
    const acctNoRef = useRef(null);
    const acctNameRef = useRef(null);

    const { setMessage } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [role, setRole] = useState(null);

    useEffect(() => {
        axiosClient
            .get(`/users/${userID}`)
            .then(({ data }) => {
                console.log(data.user)
                const userRole = data.user.roles.length > 0 ? data.user.roles[0].name : null;
                setRole(userRole);
                nameRef.current.value = data.user.name;
                phoneRef.current.value = data.user.phone;
                addressRef.current.value = data.user.trader.address || "";
                bankRef.current.value = data.user.trader.bank || "";
                acctNoRef.current.value = data.user.trader.acct_no || "";
                acctNameRef.current.value =
                    data.user.trader.acct_name || "";
                
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userID]);

    const handleSubmit = (evt) => {
        setIsLoading(true);
        evt.preventDefault();
        const payload = {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
            bank: bankRef.current.value,
            acct_no: acctNoRef.current.value,
            acct_name: acctNameRef.current.value,
        };
        axiosClient
            .put(`/traders/${userID}`, payload)
            .then(({ data }) => {
                console.log(data);
                setIsLoading(false);
                setErrors([]);
                setMessage(`Updated trader, ${nameRef.current.value}`);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="container">
            <div className="col-lg-6 col-12 mx-auto my-5">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Edit {role} Profile</h5>
                        {errors.length > 0 && <Errors errors={errors} />}
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    ref={nameRef}
                                />
                            </div>

                            <div className="col-12">
                                <label
                                    htmlFor="telephone"
                                    className="form-label"
                                >
                                    Phone No
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="telephone"
                                    ref={phoneRef}
                                />
                            </div>
                            <div className="col-12">
                                <label
                                    htmlFor="address"
                                    className="form-label"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    ref={addressRef}
                                />
                            </div>
                            <>
                                <h2>Optional</h2>
                                <div className="col-12">
                                    <label
                                        htmlFor="bank"
                                        className="form-label"
                                    >
                                        Bank
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bank"
                                        ref={bankRef}
                                    />
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="acct_no"
                                        className="form-label"
                                    >
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="acct_no"
                                        ref={acctNoRef}
                                    />
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="acct_name"
                                        className="form-label"
                                    >
                                        Account Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="acct_name"
                                        ref={acctNameRef}
                                    />
                                </div>
                            </>
                            <div className="d-flex align-items-center">
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary d-flex align-items-center"
                                    disabled={isLoading}
                                >
                                    Update {isLoading && <Loading />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTraderProfile;
