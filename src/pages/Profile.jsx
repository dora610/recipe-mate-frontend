import React from 'react';
import { NavLink } from 'react-router-dom';
import { API } from '../backend';
import Loader from '../components/Loader';
import useFetchData from '../hooks/useFetchData';

function Profile() {
  const [{ data, isLoading, error }, setUrl] = useFetchData(`${API}/auth`, {});

  if (isLoading) {
    return (
      <div className='relative text-center flex justify-center'>
        <Loader isLoading={isLoading} />
      </div>
    );
  }

  if (error) {
    return <h3 className='error-card'>{error}</h3>;
  }

  return (
    <div className='grid place-content-center'>
      <div className='bg-white/80 backdrop-blur-2xl p-12 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold'>Profile</h1>
        <div className='grid grid-cols-2 gap-4 items-center text-lg capitalize mt-4 pt-4 border-fuchsia-600 border-t-2'>
          <p>First Name</p>
          <p> {data?.firstName}</p>
          <p>Middle Name</p>
          <p> {data?.middleName}</p>
          <p>last Name</p>
          <p> {data?.lastName}</p>
          <p>Email</p>
          <p> {data?.email}</p>
          <p>Total recipe uploaded</p>
          <p> {data?.recipeCount}</p>
          <p>Avg. recipe ratings</p>
          <p> {data?.avgRating}</p>
          <NavLink to='/updatepassword' className='btn-primary'>
            Update password
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Profile;
