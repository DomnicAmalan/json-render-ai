import { useDispatch } from 'react-redux';
import { signoutRequest } from '../store/reducers/authReducer';

export const useSignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user data if stored
    dispatch(signoutRequest());
    window.location.href = '/signin'; // Redirect to login page
  };

  return handleSignOut;
};