import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import styles from "./Login.module.css";

const Login = () => {
    const [loading, setLoading] = useState(false);

    if (loading) return <Loader />;

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.title}>Login</h2>
                <form>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                    />
                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </form>
                <p className={styles.text}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
