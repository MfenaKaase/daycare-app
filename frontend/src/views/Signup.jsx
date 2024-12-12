import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const agentIDRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const {setUser,setToken} = useStateContext()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      phone: phoneRef.current.value,
      agent_id: agentIDRef.current.value,
    }

    axiosClient.post('/signup', payload)
    .then(({data})=> {
      setToken(data.token)
      setUser(data.user)
    })
    .catch(err => {
      console.log(err)
      const response = err.response;
      if (response && response.status === 42) {
        console.log(response.data.errors)
      }
    })
  }

  return (
    <div className='container'>
        <div className="col-lg-6 col-12 mx-auto my-5">
           <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sign Up</h5>
              {errors.length > 0 && <Errors errors={errors}/>}
              <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-12">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="name" ref={nameRef}/>
                </div>
                <div className="col-12">
                  <label htmlFor="inputEmail4" className="form-label">Email</label>
                  <input type="email" className="form-control" id="inputEmail4" ref={emailRef}/>
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" ref={passwordRef}/>
                </div>
                <div className="col-12">
                  <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="passwordConfirmation" ref={passwordConfirmationRef}/>
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">Phone No</label>
                  <input type="text" className="form-control" id="phone" ref={phoneRef}/>
                </div>
                <div className="col-12">
                  <label htmlFor="agentID" className="form-label">Agent ID</label>
                  <input type="text" className="form-control" id="agentID" ref={agentIDRef}/>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              </form>
              <p className='text-center my-5'>Already have an account? <Link to="/login" >Log in</Link></p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Signup