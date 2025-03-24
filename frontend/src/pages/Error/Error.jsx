import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import styles from "./Error.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Error = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.randomLines}>
                {[...Array(10)].map((_, index) => (
                    <div key={index} className={styles.randomLine} />
                ))}
            </div>

            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={styles.hero}
            >
                <div className={styles.glassOverlay}>
                    <div className={styles.heroContent}>
                        <motion.h1
                            initial={{ y: -50 }}
                            animate={{ y: 0 }}
                            className={styles.heroTitle}
                        >
                            Oops! Data Fetching Error
                        </motion.h1>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className={styles.heroSubtitle}
                        >
                            We're having trouble fetching data from our services.
                            Please try again later.
                        </motion.p>
                        <StyledButton>
                            <Link to="/" className="sparkle-button">
                                <span className="spark"></span>
                                <span className="backdrop"></span>
                                <span className="text">Return Home</span>
                            </Link>
                        </StyledButton>
                    </div>
                </div>
            </motion.section>
        </div>
    );
};

const StyledButton = styled.div`
    margin-top: 2rem;
    
    .sparkle-button {
        --active: 0;
        --bg: radial-gradient(
                40% 50% at center 100%,
                hsl(270 calc(var(--active) * 97%) 72% / var(--active)),
                transparent
            ),
            radial-gradient(
                80% 100% at center 120%,
                hsl(260 calc(var(--active) * 97%) 70% / var(--active)),
                transparent
            ),
            hsl(260 calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%));
        background: var(--bg);
        font-size: 1.2rem;
        font-weight: 500;
        border: 0;
        cursor: pointer;
        padding: 1em 1em;
        display: flex;
        align-items: center;
        gap: 0.25em;
        white-space: nowrap;
        border-radius: 100px;
        position: relative;
        box-shadow: 0 0 calc(var(--active) * 3em) calc(var(--active) * 1em) hsl(260 97% 61% / 0.75),
            0 0em 0 0 hsl(260 calc(var(--active) * 97%) calc((var(--active) * 50%) + 30%)) inset,
            0 -0.05em 0 0 hsl(260 calc(var(--active) * 97%) calc(var(--active) * 60%)) inset;
        transition: box-shadow var(--transition), scale var(--transition), background var(--transition);
        scale: calc(1 + (var(--active) * 0.1));
        transition: .3s;
        text-decoration: none;
        color: white;
    }
    
    .sparkle-button:hover {
        --active: 1;
        scale: 1.1;
    }
`;

export default Error;
