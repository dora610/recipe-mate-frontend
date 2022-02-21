import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../backend';
import handleHttpErrorResp from '../utils/handleErrorResponse';
import NotFound from './NotFound';

function ResetPassword() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();

  const { resetToken } = useParams();

  if (!resetToken) {
    return <NotFound />;
  }

  const submithandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    axios
      .post(
        `${API}/auth/reset/${resetToken}`,
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmRef.current.value,
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
    <div className="bg-primary grid ">
      <div className="form-card text-slate-500 my-6">
        <h2 className="form-card-title">Reset Password</h2>
        <form
          className="form-normal border-t-2 border-fuchsia-200 text-slate-600"
          onSubmit={submithandler}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-normal"
            ref={emailRef}
          />
          <label htmlFor="password">Passowrd</label>
          <input
            type="password"
            name="password"
            id="password"
            className="input-normal"
            ref={passwordRef}
          />
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="input-normal"
            ref={confirmRef}
          />

          <input type="submit" value="Reset password" className="btn-primary" />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
