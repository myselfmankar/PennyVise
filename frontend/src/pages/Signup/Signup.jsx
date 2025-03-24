import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import styles from "./Signup.module.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    if (loading) return <Loader />;

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Sign Up</h2>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Sign Up
                </button>
                <p className={styles.text}>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
