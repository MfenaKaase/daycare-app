import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import Loading from '../components/Loading';
import Errors from '../components/Errors';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const {setUser,setToken, message, setMessage} = useStateContext()
  const [isLoading, setIsLoading] = useState(false); 
  const [errors, setErrors] = useState([]);

  const handleSubmit = (evt) => {
    setIsLoading(true);
    evt.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/authentication', payload)
    .then(({data})=> {
      setIsLoading(false)
      setToken(data.token)
      setUser(data.user)
      setMessage(data.message);
      setErrors([]);
    })
    .catch(err => {
      setIsLoading(false)
      const response = err.response;
      if (response && (response.status === 401 || response.status === 422)) {
        setErrors(response.data.errors)
      }

      if (response && (response.status === 403)) {
        setErrors([{ 0 : 'Site Is Locked'}]);
        setMessage("This site is Locked! contact your website admin")
        return navigate('/locked');
      }
    })
  }

    return (
       <div className="container">
        {message !== null && (
                    <div
                        class="alert alert-success alert-dismissible fade show"
                        role="alert"
                    >
                        <strong>{message}!</strong>
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
         <div className="col-lg-6 col-12 mx-auto my-5">
          {Object.keys(errors)[0]  && <Errors errors={errors}/>}
           <div className="card">
            <div className="card-body">

              <h5 className="card-title">Sign In</h5>

              <form className="row g-3" onSubmit={handleSubmit} method='POST'>
                <div className="col-12">
                  <label for="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name='email' ref={emailRef}/>
                </div>
                <div className="col-12">
                  <label for="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name='password' ref={passwordRef}/>
                </div>
                <div className="text-center d-flex justify-c ontent-center">
                  <button type="submit" className="btn btn-lg btn-primary d-flex align-items-center" disabled={isLoading}>Sign In {isLoading && <Loading />}</button>
                  
                </div>

              </form>
              <p className="text-center">Don't have an account yet? <Link to="/signup" >Sign up</Link></p>
            </div>
          </div>
        </div>
       </div>
    );
}

export default Login;
