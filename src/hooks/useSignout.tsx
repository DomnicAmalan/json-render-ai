import { useDispatch } from 'react-redux';
import { signoutRequest } from '../store/reducers/authReducer';

export const useSignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    dispatch(signoutRequest());
    window.location.href = '/signin'; 
  };

  return handleSignOut;
};