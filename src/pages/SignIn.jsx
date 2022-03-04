import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.isAdmin
    ? '/admin'
    : location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (!email) return setError('Please enter valid email');
    if (!password || password.length < 8)
      return setError('Please enter valid password, min length should be 6');

    setIsLoading(true);
    try {
      let status = await signIn({ email, password });
      if (status) {
        setIsLoading(false);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setIsLoading(false);
      setError(handleHttpErrorResp(err));
    }
  };

  return (
    <div className="py-6 grid place-content-center">
      <div className="form-card bg-opacity-80 backdrop-blur-2xl">
        <h2 className="form-card-title">Sign In</h2>
        {error && <h4 className="text-danger">{error}</h4>}

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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              className="input-normal"
              defaultValue={emailRef.current}
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
              defaultValue={passwordRef.current}
            />
          </div>
          <button disabled={isLoading} type="submit" className="btn-primary">
            Sign In
          </button>
        </form>
        <div className="font-light text-base grid grid-cols-2 justify-items-center gap-2">
          <div>
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-700 font-normal">
              Sign up
            </Link>
          </div>
          <Link to="/forgotpassword" className="text-blue-700 font-normal">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
