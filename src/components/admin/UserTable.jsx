import axios from 'axios';
import { DateTime } from 'luxon';
import React, { useRef } from 'react';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { MdRefresh } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API } from '../../backend';
import { useAdminContent } from '../../context/adminContentContext';
import useAuth from '../../hooks/useAuth';
import handleHttpErrorResp from '../../utils/handleErrorResponse';
import ActionBtn from './ActionBtn';
import CollectionTable from './CollectionTable';

function UserTable() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { content } = useAdminContent();

  let users = content.userData ? content.userData.users : [];

  const tableheaderRef = useRef([
    'Sr. no.',
    'First name',
    'Last name',
    'Email',
    'Created at',
    'Updated at',
    'Action',
  ]);

  if (!users.length) {
    return <h3 className="text-stone-500">No user found</h3>;
  }

  const insertHandler = () => {
    navigate('/admin/user/add');
  };

  const deleteHandler = (id) => {
    setContent({ ...content, isLoading: true, error: null });
    axios({
      url: `${API}/admin/user/${id}`,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user['jwt']}`,
        auth: user.userId,
      },
    })
      .then((response) => {
        toast.success(response.data.status);
        return axios({
          url: `${API}/admin/user/all`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user['jwt']}`,
            auth: user.userId,
          },
        });
      })
      .then((response) => {
        setContent({
          ...content,
          isLoading: false,
          userData: response.data,
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

  const refreshHandler = () => {
    //
  };

  return (
    <>
      <div className="flex space-x-4 items-center">
        <h3 className="text-xl font-semibold mb-2">Users</h3>
        <MdRefresh
          className="fill-purple-600 text-xl"
          onClick={refreshHandler}
        />
        <HiOutlineDocumentAdd
          className="stroke-green-700 hover:fill-green-200"
          onClick={insertHandler}
        />
      </div>
      <CollectionTable
        headers={tableheaderRef.current}
        className="grid-cols-[2rem_repeat(5,_1fr)_auto]"
      >
        {users.map((user, index) => (
          <React.Fragment key={index}>
            <div className="cell">{index + 1}</div>
            <div className="cell">{user?.firstName}</div>
            <div className="cell">{user?.lastName}</div>
            <div className="cell">{user?.email}</div>
            <div className="cell">
              {DateTime.fromISO(user?.createdAt).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </div>
            <div className="cell">
              {DateTime.fromISO(user?.updatedAt).toLocaleString(
                DateTime.DATETIME_MED
              )}
            </div>
            <ActionBtn
              updateHandler={() => {
                navigate(`/admin/user/${user._id}`);
              }}
              deleteHandler={() => deleteHandler(user._id)}
            />
          </React.Fragment>
        ))}
      </CollectionTable>
    </>
  );
}

export default UserTable;
