import React, { useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import Loading from '../components/Loading';
import Errors from '../components/Errors';

function Register() {
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const passwordRef = useRef();
  const dateOfBirthRef = useRef();
  const loginIDRef = useRef();
  const bankRef = useRef();
  const acctNameRef = useRef();
  const acctNoRef = useRef();

  const { roles, setMessage } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState('trader');
  const navigate = useNavigate();

  const handleRoleChange = (evt) => {
    console.log(evt.target.value);
    setRole(evt.target.value);
  }


  const handleSubmit = (evt) => {
    setIsLoading(true)
    evt.preventDefault()
    let payload = {}

    let endpoint = 'traders'

    if (role == 'trader') {

      payload = {
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        date_of_birth: dateOfBirthRef.current.value,
        address: addressRef.current.value,
        bank: bankRef.current.value,
        acct_no: acctNoRef.current.value,
        acct_name: acctNameRef.current.value,
      }
    } else {
      endpoint = 'register'
      payload = {
        name: nameRef.current.value,
        password: passwordRef.current.value,
        phone: phoneRef.current.value,
        login_id: loginIDRef.current.value,
      }
    }

    axiosClient.post(`/${endpoint}`, payload)
      .then(({ data }) => {
        setIsLoading(false)
        setErrors([])
        setMessage(`Created a new ${role}, ${nameRef.current.value}`)

        navigate(`/${role}s`)

        nameRef.current.value = '';
        passwordRef.current.value = '';
        phoneRef.current.value = '';
        addressRef.current.value = '';
        loginIDRef.current.value = ''
        dateOfBirthRef.current.value = '';

      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
          console.log(response.data.errors)
        }
      })
  }

  return (
    <div className='container'>
      <div className="col-lg-6 col-12 mx-auto my-5">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Register</h5>
            {Object.keys(errors).length > 0 && <Errors errors={errors} />}
            <form className="row g-3" onSubmit={handleSubmit}>
              {<div className="col-12">
                <label htmlFor="type" className="form-label">Role</label>
                <select name="type" id="" className="form-control" onChange={handleRoleChange}>
                  <option value="trader">Trader</option>
                  <option value="agent">Agent</option>
                </select>
              </div>}
              <div className="col-12">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input type="text" className="form-control" id="name" ref={nameRef} />
              </div>
              {
                role == 'agent'
                &&
                <>
                  <div className="col-12">
                    <label htmlFor="login_id" className="form-label">Login ID</label>
                    <input type="tel" className="form-control" id="login_id" ref={loginIDRef} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" ref={passwordRef} />
                  </div>
                </>
              }
              <div className="col-12">
                <label htmlFor="telephone" className="form-label">Phone No</label>
                <input type="tel" className="form-control" id="itelephone" ref={phoneRef} />
              </div>
              {role == 'trader'
                &&
                <>
                  <div className="col-12">
                    <label htmlFor="date" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" id="date_of_birth" ref={dateOfBirthRef} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Market Address</label>
                    <input type="text" className="form-control" id="address" ref={addressRef} />
                  </div>
                </>
              }

              {role === 'trader' && (
                <>
                  <h2>Optional</h2>
                  <div className="col-12">
                    <label htmlFor="bank" className="form-label">Bank</label>
                    <input type="text" className="form-control" id="bank" ref={bankRef} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="acct_no" className="form-label">Account Number</label>
                    <input type="text" className="form-control" id="acct_no" ref={acctNoRef} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="acct_name" className="form-label">Account Name</label>
                    <input type="text" className="form-control" id="acct_name" ref={acctNameRef} />
                  </div>
                </>
              )}


              <div className="d-flex align-items-center">
                <button type="submit" className="btn btn-lg btn-primary d-flex align-items-center" disabled={isLoading}>Register {isLoading && <Loading />}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register