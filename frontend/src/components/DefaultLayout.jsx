import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import Loading from "./Loading";

function DefaultLayout() {
    const {
        user,
        token,
        setToken,
        setUser,
        roles,
        setRoles,
        message,
        setMessage,
    } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);
    const [locked, setLocked] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        document.body.classList.toggle("toggle-sidebar");
    };

    const handleLock = (evt) => {
        setIsLoading(true);
        evt.preventDefault();
        axiosClient
            .post("/lock-toggle")
            .then((response) => {
                setIsLoading(false);
                console.log(response);
                setLocked(response.data.setting.value);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    const handleLogout = (evt) => {
        setIsLoading(true);
        evt.preventDefault();
        axiosClient
            .post("/logout")
            .then((reponse) => {
                setToken(null);
                setIsLoading(false);
                return <Navigate to="/login" />;
            })
            .catch((err) => {
                setToken(null);
                setIsLoading(false);
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            console.log(data.roles);
            setRoles(data.roles);
            setUser(data.user);
            setIsAdmin(data.roles.includes('admin'))
            setLocked(data.user.is_locked);
        });

    }, []);

    if (!token) {
        navigate("/login");
    } 

   

    return (
        <>
            <header
                id="header"
                class="header fixed-top d-flex align-items-between"
            >
                <div class="d-flex align-items-center justify-content-between">
                    <a href="index.html" class="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span class="d-none d-lg-block">GrayFinancial</span>
                    </a>
                    <i
                        class="bi bi-list toggle-sidebar-btn"
                        onClick={handleClick}
                    ></i>
                </div>
            </header>

            <aside id="sidebar" class="sidebar">
                <ul class="sidebar-nav" id="sidebar-nav">
                    <li class="nav-item">
                        <Link class="nav-link collapsed" to="/dashboard">
                            <i class="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    {isAdmin && (
                        <>
                            <li class="nav-item">
                                <Link class="nav-link collapsed" to="/loans">
                                    <i class="bi bi-cash"></i>
                                    <span>Loans</span>
                                </Link>
                            </li>

                            <li class="nav-item">
                                <Link class="nav-link collapsed" to="/users">
                                    <i class="bi bi-person"></i>
                                    <span>Users</span>
                                </Link>
                            </li>

                            <li class="nav-item">
                                <Link class="nav-link collapsed" to="/agents">
                                    <i class="bi bi-people"></i>
                                    <span>Agents</span>
                                </Link>
                            </li>
                        </>
                    )}

                    <li class="nav-item">
                        <Link class="nav-link collapsed" to="/traders">
                            <i class="bi bi-people"></i>
                            <span>Traders</span>
                        </Link>
                    </li>

                    {isAdmin && (
                        <>
                            <li class="nav-item">
                                <Link
                                    class="nav-link collapsed"
                                    to="/withdrawals"
                                >
                                    <i class="bi bi-envelope"></i>
                                    <span>Withdrawals</span>
                                </Link>
                            </li>

                            <li class="nav-item">
                                <Link class="nav-link collapsed" to="/savings">
                                    <i class="bi bi-envelope"></i>
                                    <span>Savings</span>
                                </Link>
                            </li>
                        </>
                    )}

                    <li class="nav-item">
                        <Link class="nav-link collapsed" to="/register">
                            <i class="bi bi-card-list"></i>
                            <span>Register</span>
                        </Link>
                    </li>

                    {/* {
        isAdmin &&
        <li class="nav-item">
        <a class="nav-link collapsed bg-dark text-light btn-lg" href='' onClick={handleLock} disabled={isLoading}>
          <i className={"bi " + (locked ? "bi-lock" : "bi-unlock")}></i>
          <span class="">{locked ? 'Unlock Application' : 'Lock Application'}</span> 
          {isLoading && <Loading />}
        </a>
      </li>
      } */}

                    <li class="nav-item">
                        <a
                            class="nav-link collapsed bg-danger text-light btn-lg"
                            href=""
                            onClick={handleLogout}
                            disabled={isLoading}
                        >
                            <i class="bi bi-box-arrow-in-right"></i>
                            <span class="">Logout</span>
                            {isLoading && <Loading />}
                        </a>
                    </li>
                </ul>
            </aside>

            <main id="main" class="main">
                <div class="pagetitle">
                    <h1>Hi, {user ? user.name : ''}</h1>
                </div>

                {message !== null && (
                    <div
                        class="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        <strong>{message}!</strong>.
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                            onClick={() => {
                                setMessage(null);
                            }}
                        ></button>
                    </div>
                )}

                <Outlet />
            </main>
            {/* 
  <footer id="footer" class="footer">
    
  </footer> */}

            <a
                href="#"
                class="back-to-top d-flex align-items-center justify-content-center"
            >
                <i class="bi bi-arrow-up-short"></i>
            </a>
        </>
    );
}

export default DefaultLayout;
