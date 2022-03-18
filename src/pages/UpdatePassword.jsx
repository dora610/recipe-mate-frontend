import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../backend';
import useAuth from '../hooks/useAuth';
import handleHttpErrorResp from '../utils/handleErrorResponse';

function UpdatePassword() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(false);
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const cnfrmPassowrdRef = useRef();

  const submithandler = (e) => {
    e.preventDefault();
    setError(null);

    if (cnfrmPassowrdRef.current.value !== newPasswordRef.current.value) {
      setError('New and confirmed password is not matching');
      return;
    }
    if (oldPasswordRef.current.value === newPasswordRef.current.value) {
      setError('Old and new password cannot be same');
      return;
    }

    setIsLoading(true);

    axios
      .post(
        `${API}/auth/updatepassword`,
        {
          oldPassword: oldPasswordRef.current.value,
          newPassword: newPasswordRef.current.value,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['jwt']}`,
            auth: user.userId,
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        toast.success(response.data.status);
        navigate(-1, { replace: true });
      })
      .catch((err) => {
        setIsLoading(false);
        setError(handleHttpErrorResp(err));
      });
  };

  return (
    <div className='grid justify-center items-center'>
      <div className='form-card text-slate-500 bg-opacity-80 backdrop-blur-2xl w-fit'>
        <h2 className='form-card-title'>Update Password</h2>
        {error && <h4 className='text-danger'>{error}</h4>}
        {isLoading && <h2 className='text-warn'>Loading...</h2>}
        <form
          className='form-normal border-t-2 border-fuchsia-400'
          onSubmit={submithandler}
        >
          <label htmlFor='oldPassword' className='text-slate-600'>
            Old Password
          </label>
          <input
            type='password'
            name='oldPassword'
            id='oldPassword'
            className='input-normal'
            ref={oldPasswordRef}
          />

          <label htmlFor='newPassword' className='text-slate-600'>
            New Password
          </label>
          <input
            type='password'
            name='newPassword'
            id='newPassword'
            className='input-normal'
            ref={newPasswordRef}
          />

          <label htmlFor='confirmPassword' className='text-slate-600'>
            Confirm Password
          </label>
          <input
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            className='input-normal'
            ref={cnfrmPassowrdRef}
          />

          <input
            type='submit'
            value='Continue'
            className='btn-primary disabled:bg-fuchsia-400'
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default UpdatePassword;
