import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authContext from '../context/authContext';

function RequireAuth({ children }) {
  const { user } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin', { state: { from: location }, replace: true });
    }
  }, [user]);

  /* if (!user) {
    return <Navigate to={'/signin'} state={{ from: location }} replace />;
  } */

  return <div>{children}</div>;
}

export default RequireAuth;
