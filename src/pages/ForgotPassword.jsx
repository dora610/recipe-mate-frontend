import axios from 'axios';
import React, { useRef, useState } from 'react';
import { API } from '../backend';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState();
  const emailRef = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    axios
      .put(
        `${API}/auth/forgotpassword`,
        {
          email: emailRef.current.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setSuccess(response.data.status);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(handleHttpErrorResp(err));
      });
  };

  if (isLoading) {
    return <h2 className="text-warn">Loading...</h2>;
  }

  if (error) {
    return <h4 className="text-danger">{error}</h4>;
  }

  if (success) {
    return <h4 className="text-success">{success}</h4>;
  }

  return (
    <div className="grid justify-center items-center">
      <div className="form-card text-slate-500 bg-opacity-80 backdrop-blur-2xl">
        <h2 className="form-card-title">Forgot Password</h2>
        <form
          className="form-normal border-t-2 border-fuchsia-400"
          onSubmit={submithandler}
        >
          <label htmlFor="email" className="text-slate-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-normal"
            ref={emailRef}
          />
          <input type="submit" value="Continue" className="btn-primary" />
        </form>
        <h4 className="text-sm text-center">
          We will send you an email with instructions on how to reset your
          password.
        </h4>
      </div>
    </div>
  );
}

export default ForgotPassword;
