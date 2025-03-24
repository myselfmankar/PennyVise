import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logoImage from "../../assets/logoimage.png";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navLeft}>
                <img src={logoImage} alt="Logo" className={styles.logoImage} />
                <span className={styles.logo}>GenAI Finance</span>
            </div>
            <div className={styles.navRight}>
                <Link to="/" className={styles.navButton}>
                    Home
                </Link>
                <Link to="/login" className={styles.navButton}>
                    Sign In
                </Link>
                <Link to="/signup" className={styles.navButton}>
                    Sign Up
                </Link>
                <Link to="/about" className={styles.navButton}>
                    About
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
