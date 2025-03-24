import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./About.module.css";
import Navbar from "../../components/Navbar/Navbar";

const About = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate("/dashboard");
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <div className={styles.navLeft}>
                    <span className={styles.logo}>PennyVise</span>
                </div>
                <div className={styles.navRight}>
                    <button 
                        className={styles.searchButton}
                        onClick={handleSearch}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                    <a href="/" className={styles.navButton}>
                        Home
                    </a>
                    <a href="/login" className={styles.navButton}>
                        Sign In
                    </a>
                    <a href="/signup" className={styles.navButton}>
                        Sign Up
                    </a>
                </div>
            </nav>

            {/* About Section */}
            <section className={styles.aboutSection}>
                <h1 className={styles.aboutTitle}>About Us</h1>
                <p className={styles.aboutDescription}>
                    At GenAI Finance, we are revolutionizing the way people
                    manage their finances. Our AI-powered platform provides
                    personalized insights, real-time analytics, and portfolio
                    management tools to help you make smarter financial
                    decisions.
                </p>
                <div className={styles.teamSection}>
                    <h2 className={styles.teamTitle}>Our Team</h2>
                    <div className={styles.teamMembers}>
                        {/* Team Member 1 */}
                        <div className={styles.teamMember}>
                            <div className={styles.align}>
                                <span className={styles.red} />
                                <span className={styles.yellow} />
                                <span className={styles.green} />
                            </div>
                            <h3 className={styles.teamMemberName}>
                                Omkar Mutyalwar
                            </h3>
                            <div className={styles.teamMemberDetails}>
                                <p className={styles.teamMemberRole}>
                                    Role
                                </p>
                                <div className={styles.teamMemberContact}>
                                    <a
                                        href="mailto:omkarmutyalwar5@gmail.com"
                                        className={styles.contactLink}
                                    >
                                        📧 Gmail
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/omkar-mutyalwar/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.contactLink}
                                    >
                                        🔗 LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className={styles.teamMember}>
                            <div className={styles.align}>
                                <span className={styles.red} />
                                <span className={styles.yellow} />
                                <span className={styles.green} />
                            </div>
                            <h3 className={styles.teamMemberName}>
                                Vaishnav Mankar
                            </h3>
                            <div className={styles.teamMemberDetails}>
                                <p className={styles.teamMemberRole}>
                                    Role
                                </p>
                                <div className={styles.teamMemberContact}>
                                    <a
                                        href="mailto:pict.vaishnav@gmail.com"
                                        className={styles.contactLink}
                                    >
                                        📧 Gmail
                                    </a>
                                    <a
                                        href="www.linkedin.com/in/vaishnav-mankar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.contactLink}
                                    >
                                        🔗 LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className={styles.teamMember}>
                            <div className={styles.align}>
                                <span className={styles.red} />
                                <span className={styles.yellow} />
                                <span className={styles.green} />
                            </div>
                            <h3 className={styles.teamMemberName}>
                                Sakshi Shinde
                            </h3>
                            <div className={styles.teamMemberDetails}>
                                <p className={styles.teamMemberRole}>
                                    Role
                                </p>
                                <div className={styles.teamMemberContact}>
                                    <a
                                        href="mailto:sakshi@gmail.com"
                                        className={styles.contactLink}
                                    >
                                        📧 Gmail
                                    </a>
                                    <a
                                        href="www.linkedin.com/in/vaishnav-mankar"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.contactLink}
                                    >
                                        🔗 LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 4 */}
                        <div className={styles.teamMember}>
                            <div className={styles.align}>
                                <span className={styles.red} />
                                <span className={styles.yellow} />
                                <span className={styles.green} />
                            </div>
                            <h3 className={styles.teamMemberName}>
                                Pranav Chaudhari
                            </h3>
                            <div className={styles.teamMemberDetails}>
                                <p className={styles.teamMemberRole}>
                                    Role
                                </p>
                                <div className={styles.teamMemberContact}>
                                    <a
                                        href="mailto:pranav@gmail.com"
                                        className={styles.contactLink}
                                    >
                                        📧 Gmail
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/omkar-mutyalwar/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.contactLink}
                                    >
                                        🔗 LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <p className={styles.footerText}>&copy; GenAI Finance.</p>
            </footer>
        </div>
    );
};

export default About;
