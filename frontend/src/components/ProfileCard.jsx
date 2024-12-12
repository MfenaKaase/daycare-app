import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import "../styles.css";
import axiosClient from "../axios-client";
import { Link, useNavigate } from "react-router-dom";

function ProfileCard({ profile, role, isLocked }) {
    console.log(profile)
    const { setMessage, roles } = useStateContext();
    const navigate = useNavigate();

    const handleDelete = () => {
        axiosClient
            .delete(`/users/${profile.id}`)
            .then((data) => {
                
                setMessage("User deleted Successfully!");
                navigate("/users");
            })
            .catch((err) => {
                console.log(err);
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className="wrapper">
            <div className="profile-card js-profile-card">
                <div className="profile-card__img">
                    <img src="https://bit.ly/3weS3Qg" alt="profile card" />
                </div>

                <div className="profile-card__cnt js-profile-cnt">
                    <div className="profile-card__name">{profile.name}</div>
                    <div className="profile-card__txt">
                        {role ? role.toUpperCase() : ""}
                    </div>
                    <div className="profile-card-loc ">
                        {profile.trader != null && (
                            <div>
                                <span className="profile-card-loc gap-2">
                                    {profile.login_id}
                                </span>
                            </div>
                        )}
                      
                    </div>

                    <span className="profile-card-loc__txt">
                        <span className="profile-card-loc__icon bi bi-location"></span>
                        {profile.trader != null
                            ? profile.trader.address
                            : profile.login_id}
                    </span>

                    <div className="profile-card-loc ">
                        {profile.trader != null && (
                            <div>
                                <span className="profile-card-loc gap-2">
                                    {profile.trader.acct_no}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="profile-card-loc ">
                        {profile.trader != null && (
                            <div>
                                <span className="profile-card-loc gap-2">
                                    {profile.trader.bank}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="profile-card-inf">
                        {/* <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">1598</div>
                            <div className="profile-card-inf__txt">Loan</div>
                        </div> */}
                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">NGN{profile.total_savings_today}</div>
                            <div className="profile-card-inf__txt">Savings | Today</div>
                        </div>
                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">NGN{profile.total_withdrawals_today}</div>
                            <div className="profile-card-inf__txt">
                                Withdrawal | Today
                            </div>
                        </div>
                        {/* <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">85</div>
                            <div className="profile-card-inf__txt">null</div>
                        </div> */}
                    </div>

                    <div className="profile-card-social">
                        {/* Add your social media links here */}
                    </div>

                    {roles.includes("admin") && (
                        <>
                            <div className="profile-card-ctr d-flex flex-wrap">
                                <Link
                                    className="profile-card__button button--orange btn-sm w-25"
                                    to={`/${role}s/users/${profile.id}/profile/edit`}
                                >
                                    Update Profile
                                </Link>

                                <button
                                    className="profile-card__button button--blue js-message-btn btn-sm w-25"
                                    onClick={handleDelete}
                                >
                                    Delete Profie
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* <div className="profile-card-message js-message">
          <form className="profile-card-form">
            <div className="profile-card-form__container">
              <textarea placeholder="Say something..."></textarea>
            </div>
            <div className="profile-card-form__bottom">
              <button className="profile-card__button button--blue js-message-close">Send</button>
              <button className="profile-card__button button--gray js-message-close">Cancel</button>
            </div>
          </form>
          <div className="profile-card__overlay js-message-close"></div>
        </div> */}
            </div>
        </div>
    );
}

export default ProfileCard;
