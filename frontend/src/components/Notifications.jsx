import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import moment from "moment";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";


const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const {roles} = useStateContext();

    const handleClick = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
        axiosClient
            .delete(`/notifications/${id}`)
            .then((data) => {
                console.log(data);
                setMessage("Notification removed!");
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        axiosClient
            .get("/notifications")
            .then(({ data }) => {
                setNotifications(data.notifications);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <div
                        class="alert alert-success alert-dismissible fade show"
                        role="alert"
                        key={notification.id}
                    >
                        <i class="bi bi-check-circle me-1"></i>{notification.type} | NGN {JSON.parse(notification.details).amount}
                        | {moment(JSON.parse(notification.details).created_at).fromNow()} | <Link to={`/users/${JSON.parse(notification.details).agent_id}/profile`}>Agent</Link>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                            onClick={ () => handleClick(notification.id)}
                        ></button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
