import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../styles/Signin.module.css'
import { signinRequest } from '../../store/reducers/authReducer';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signinRequest({email, password}));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Signin</button>
      </form>
      <Link to="/signup" className={styles.signupLink}>Don't have an account? Sign up</Link>
    </div>
  );
};

export default Signin;