import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import handleHttpErrorResp from '../utils/handleErrorResponse';

const ContentContext = createContext();

const fectchContent = (url, user) => {
  return axios({
    url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user['jwt']}`,
      auth: user.userId,
    },
  });
};

const useAdminContent = () => {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('useAdminContent must be used within AdminContentProvider');
  }
  return context;
};

const useAdminContentAll = (fetchUrls) => {
  const { user } = useAuth();
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('useAdminContent must be used within AdminContentProvider');
  }
  const { content, setContent } = context;

  useEffect(() => {
    setContent({
      ...content,
      isLoading: true,
      error: null,
      selectedUser: null,
    });
    Promise.all(fetchUrls.map((url) => fectchContent(url, user)))
      .then((res) => {
        setContent({
          ...content,
          isLoading: false,
          userData: res[0].data,
          recipeData: res[1].data,
        });
      })
      .catch((err) => {
        setContent({
          ...content,
          isLoading: false,
          error: handleHttpErrorResp(err),
        });
      });
  }, []);

  return { content, setContent };
};

const AdminContentProvider = (props) => {
  const [content, setContent] = useState({
    userData: null,
    recipeData: null,
    isLoading: false,
    error: null,
  });

  const value = { content, setContent };
  return <ContentContext.Provider value={value} {...props} />;
};

export { useAdminContentAll, AdminContentProvider, useAdminContent };
