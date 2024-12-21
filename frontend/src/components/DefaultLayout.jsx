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
        message,
        setMessage,
    } = useStateContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        document.body.classList.toggle("toggle-sidebar");
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
            console.log(data)
            setUser(data);
        });

    }, []);

    if (!token) {
        return <Navigate to="/login" />
    } 

   

    return (
        <>
            <header
                id="header"
                class="header fixed-top d-flex align-items-between"
            >
                <div class="d-flex align-items-center justify-content-between">
                    <a href="index.html" class="logo d-flex align-items-center">
                        <img src={user.photo} alt={user.first_name} />
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

                    <li class="nav-item">
                        <Link class="nav-link collapsed" to="/register">
                            <i class="bi bi-card-list"></i>
                            <span>Register</span>
                        </Link>
                    </li>

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
                    <h1>Hi, {user ? user.first_name : ''}</h1>
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
