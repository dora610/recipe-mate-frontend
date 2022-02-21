import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

function RequireAdminAuth({ children }) {
  const { user } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin', {
        state: { isAdmin: true },
        replace: true,
      });
    } else if (user.r < 1) {
      toast.error('Access denied!! 🚫');
      navigate('/', {
        replace: true,
      });
    }
  }, [user]);

  return <div>{children}</div>;
}

export default RequireAdminAuth;
