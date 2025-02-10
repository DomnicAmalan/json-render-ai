import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/Signup.module.css'; // Import the CSS module
import { signupRequest } from '../../store/reducers/authReducer';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Dispatch the signupRequest action with email and password
      dispatch(signupRequest({ email, password }));
    };
  
    return (
      <div className={styles.container}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <Link to="/signin" className={styles.signinLink}>Already have an account? Sign in</Link>
      </div>
    );
  };
  
  export default SignUp;