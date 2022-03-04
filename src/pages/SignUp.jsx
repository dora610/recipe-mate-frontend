import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const { signUp } = useAuth();

  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const firstName = firstNameRef.current.value;
    const middleName = middleNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!firstName) return setError('First name cannot be empty');
    if (!lastName) return setError('Last name cannot be empty');
    if (!email) return setError('Valid email required');
    if (
      !password ||
      password.length < 6 ||
      (!confirmPassword && confirmPassword.length < 6)
    )
      return setError('Password missing / min length should be 6');
    if (password !== confirmPassword)
      return setError('Password & confirm password is not matching');

    const userData = {
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    setIsLoading(true);
    signUp(userData)
      .then((status) => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="py-6">
      <div className="form-card bg-opacity-80 backdrop-blur-2xl">
        <h2 className="form-card-title">Sign Up</h2>
        {error && (
          <div className="text-danger">
            <p>{error}</p>
          </div>
        )}
        {isLoading && (
          <div className="text-warn">
            <p>Loading...</p>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="form-normal border-t-2 border-fuchsia-400"
        >
          <div className="flex flex-col">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              ref={firstNameRef}
              className="input-normal"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="middle-name">Middle Name</label>
            <input
              type="text"
              name="middle-name"
              id="middle-name"
              ref={middleNameRef}
              className="input-normal"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              ref={lastNameRef}
              className="input-normal"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              className="input-normal"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              className="input-normal"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              ref={confirmPasswordRef}
              className="input-normal"
              required
            />
          </div>
          <button disabled={isLoading} type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
        <div className="font-light text-base">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-700 font-normal">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
