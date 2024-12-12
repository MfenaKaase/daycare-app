import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import Loading from "../components/Loading";
import Errors from "../components/Errors";

function EditAgentProfile() {
    const { userID } = useParams();
    const nameRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef(null);
    const loginIDRef = useRef(null);

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
                loginIDRef.current.value = data.user.login_id;
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
            });
    }, [userID]);

    const handleSubmit = (evt) => {
        setIsLoading(true);
        evt.preventDefault();
        const endpoint = role === "trader" ? "traders" : "users";
        const payload = {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            login_id: loginIDRef.current.value,
            password: passwordRef ? passwordRef.current.value : null,
        };
        axiosClient
            .put(`/${endpoint}/${userID}`, payload)
            .then(({ data }) => {
                console.log(data);
                setIsLoading(false);
                setErrors([]);
                setMessage(`Updated ${role}, ${nameRef.current.value}`);
            })
            .catch((err) => {
                console.log(err.response.data.errors);
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
                        {Object.keys(errors).length > 0 && <Errors errors={errors} />}
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
                            <>
                                <div className="col-12">
                                    <label
                                        htmlFor="login_id"
                                        className="form-label"
                                    >
                                        Login ID
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="login_id"
                                        ref={loginIDRef}
                                    />
                                </div>

                                <div className="col-12">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        ref={passwordRef}
                                    />
                                </div>
                            </>
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

export default EditAgentProfile;
