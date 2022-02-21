import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../backend';
import { useAdminContent } from '../../context/adminContentContext';
import useAuth from '../../hooks/useAuth';
import NotFound from '../../pages/NotFound';
import handleHttpErrorResp from '../../utils/handleErrorResponse';

function UserForm() {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isUpdateuser, setIsUpdateuser] = useState(false);

  const { content, setContent } = useAdminContent();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();

  if (!userId) {
    return <NotFound />;
  }

  //TODO: custom hook for update user - supply isloading, error and the user to be updated

  useEffect(() => {
    let selectedUser = content.userData?.users.filter(
      (user) => user._id === userId
    )[0];
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setMiddleName(selectedUser?.middleName);
      setLastName(selectedUser.lastName);
      setEmail(selectedUser.email);
      setIsUpdateuser(true);
    }
  }, []);

  const submithandler = (e) => {
    e.preventDefault();

    let userData = {
      firstName,
      middleName,
      lastName,
      email,
    };

    let isNotValidUserInput = validateData(userData);
    if (isNotValidUserInput) {
      setContent({ ...content, error: isNotValidUserInput });
      return;
    }

    isUpdateuser ? updateUserHandler(userData) : addUserHandler(userData);
  };
  const validateData = (userData) => {
    if (!userData.firstName) {
      return 'Invalid first name';
    }
    if (!userData.lastName) {
      return 'Invalid last name';
    }
    if (!userData.email) {
      return 'Invalid error';
    }
    return false;
  };

  const updateUserHandler = async (data) => {
    try {
      setContent({ ...content, isLoading: true, error: null });
      let response = await axios({
        url: `${API}/admin/user/${userId}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user['jwt']}`,
          auth: user.userId,
        },
        data,
      });
      toast.success(response.data.status);
      setContent({ ...content, isLoading: false });
    } catch (err) {
      setContent({
        ...content,
        isLoading: false,
        error: handleHttpErrorResp(err),
      });
    }
  };

  const addUserHandler = (data) => {
    setContent({ ...content, isLoading: true, error: null });
    axios({
      url: `${API}/admin/user`,
      method: 'POST',
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user['jwt']}`,
        auth: user.userId,
      },
    })
      .then((response) => {
        toast.success(response.data.status);
        setContent({
          ...content,
          isLoading: false,
        });
      })
      .catch((err) =>
        setContent({
          ...content,
          isLoading: false,
          error: handleHttpErrorResp(err),
        })
      );
  };

  if (content.isLoading) {
    return <h3 className="text-warn">Loading...</h3>;
  }

  return (
    <div>
      {content.isLoading && <h3 className="text-warn">Loading...</h3>}
      {content.error && <h3 className="error-card">{content.error}</h3>}
      <div className="grid grid-cols-3 justify-items-center items-center mt-4 border-b-2 pb-2 border-fuchsia-200">
        <button
          className="justify-self-start border-2 border-fuchsia-400 hover:bg-fuchsia-400 group hover:text-white px-2 py-1 rounded-md flex gap-2 items-center justify-evenly"
          onClick={() => {
            navigate('/admin/user');
          }}
        >
          <MdOutlineKeyboardBackspace className="fill-stone-800 group-hover:fill-white" />
          Back
        </button>
        <h3 className="text-2xl font-semibold">
          {isUpdateuser ? 'Update user' : 'Add user'}
        </h3>
      </div>
      <form
        className="form-normal grid grid-cols-3 items-center"
        onSubmit={submithandler}
      >
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          autoFocus
          className="input-sm col-span-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="middleName">Middle name</label>
        <input
          type="text"
          name="middleName"
          id="middleName"
          className="input-sm col-span-2"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className="input-sm col-span-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="input-sm col-span-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn-primary col-start-2">
          {isUpdateuser ? 'Update user' : 'Add user'}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
