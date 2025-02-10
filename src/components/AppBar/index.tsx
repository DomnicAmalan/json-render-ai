import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useSignOut } from "../../hooks/useSignout";
import styles from "../styles/AppBar.module.css";

const AppBar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const handleSignOut = useSignOut();

  if (!isAuthenticated) return null;

  return (
    <nav className={styles.appBar}>
      <div className={styles.appBarLeft}>
        <Link to="/workspace" className={styles.appBarLink}>
          Home
        </Link>
      </div>

      <div className={styles.appBarRight}>
        <Link to="/settings" className={styles.appBarLink}>
          Settings
        </Link>
        <button 
          onClick={handleSignOut} 
          className={styles.appBarSignout}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default AppBar;