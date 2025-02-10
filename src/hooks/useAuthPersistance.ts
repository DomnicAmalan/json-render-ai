import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../store/reducers/authReducer';

export const useAuthPersistence = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      
      const user = JSON.parse(localStorage.getItem('user') || '{}'); 
      dispatch(signinSuccess(user));
    }
  }, [dispatch]);
};