import { API } from '../backend';
import axios from 'axios';

export const userSignIn = (userCreds) => {
  return axios({
    url: `${API}/auth/signin`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(userCreds),
  }).then((res) => res.data);
};

export const userSignUp = (userData) => {
  return fetch(`${API}/auth/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(
        `HTTP error occurred! status:${res.statusText} | ${res.status}`
      );
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    });
};

export const userSignOut = () => {
  return fetch(`${API}/auth/signout`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(
        `HTTP error occurred! status:${res.statusText} | ${res.status}`
      );
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data.status;
    });
};

export const removeAuthentication = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem('auth');
  }
};

export const authenticate = (userData) => {
  if (typeof window !== undefined) {
    localStorage.setItem('auth', JSON.stringify(userData));
  }
};

export const isAuthenticated = () => {
  if (typeof window !== undefined) {
    let storedUserData = JSON.parse(localStorage.getItem('auth'));
    if (storedUserData && storedUserData.expiresAt > Date.now()) {
      return storedUserData;
    }
  }
  return false;
};
