import React, { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { useParams, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import moment from "moment";
import CustomDataTable from "../components/CustomDataTable";
import { useStateContext } from "../contexts/ContextProvider";

function Profile() {
    const { userID } = useParams();
    const [userProfile, setUserProfile] = useState({});
    const [role, setRole] = useState(null);
    const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
    const [filteredSavingss, setFilteredSavingss] = useState([]);
    const [filteredLoans, setFilteredLoans] = useState([]);
    const [isLocked, setIsLocked] = useState();
    const {roles} = useStateContext()

    const handleLock = (id) => {
        axiosClient
            .post(`/users/${id}/lock`)
            .then(({data}) => {
                console.log(data);
                setIsLocked(data.is_locked)
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    useEffect(() => {
        fetchUserProfile();
    }, [userID]);

    const fetchUserProfile = () => {
        axiosClient
            .get(`/users/${userID}/profile`)
            .then(({ data }) => {
                
                setUserProfile(data.user);
                setIsLocked(data.user.is_locked)
                const userRole =
                    data.user.roles.length > 0 ? data.user.roles[0].name : null;
                setRole(userRole);
                if (userRole !== "trader") {
                    setFilteredWithdrawals(data.user.withdrawals);
                    setFilteredSavingss(data.user.savings)
                } else {
                    setFilteredWithdrawals(data.user.trader.withdrawals);
                    setFilteredSavingss(data.user.trader.savings)
                    setFilteredLoans(data.user.trader.loans)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            { roles.includes('admin') && <button className={`btn btn-lg bi bi-${isLocked ? 'lock' : 'unlock'} border-dark`} onClick={() => handleLock(userID)}>{isLocked? 'Unlock' : 'Lock'}</button>}
            <ProfileCard profile={userProfile} role={role} isLocked={isLocked}/>
            <CustomDataTable type="savings" data={filteredSavingss} />
            <CustomDataTable type="withdrawals" data={filteredWithdrawals} />
            <CustomDataTable type="loans" data={filteredLoans} />
        </div>
    );
}

export default Profile;
