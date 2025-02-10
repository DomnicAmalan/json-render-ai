import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../store/reducers/authReducer';

export const useAuthPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally fetch user data from the backend or decode the token
      const user = JSON.parse(localStorage.getItem('user') || '{}'); // Example: Store user data in localStorage
      dispatch(signinSuccess(user));
    }
  }, [dispatch]);
};