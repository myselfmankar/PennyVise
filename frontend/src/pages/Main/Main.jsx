import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Main.module.css";
import { getInvestmentRecommendations } from "../../services/api"; // Import the new API function

const Main = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // Trending topics related to Gen AI Finance Assistant
    const trendingTopics = [
        "AI-powered portfolio management",
        "Real-time stock market analysis",
        "Personalized financial insights",
        "Automated investment strategies",
        "Risk assessment using AI",
        "Cryptocurrency trends and predictions",
        "Retirement planning with AI",
        "Tax optimization using AI",
    ];

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter trending topics based on the query
        if (query) {
            const filteredSuggestions = trendingTopics.filter((topic) =>
                topic.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]); // Clear suggestions if the search bar is empty
        }
    };

    // Handle search submission
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const response = await getInvestmentRecommendations(searchQuery);
            setRecommendations(response.data.recommendations);
        }
    };

    // Helper to return appropriate CSS class for a recommendation
    const getRecommendationClass = (recommendation) => {
        if (recommendation === "Hold") {
            return styles.holdRecommendation; // yellow color styling
        }
        // ...additional logic for other recommendations if needed...
        return "";
    };

    return (
        <div className={styles.container}>
            {/* Navbar */}
            <nav className={styles.navbar}>
                <div className={styles.navLeft}>
                    <span className={styles.logo}>PennyVise</span>
                </div>
                <div className={styles.navRight}>
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

            {/* Main Content */}
            <main className={styles.mainContent}>
                <h1 className={styles.mainTitle}>Welcome to PennyVise</h1>
                <p className={styles.mainSubtitle}>
                    Your personal AI-powered financial assistant.
                </p>

                {/* Centered Search Bar */}
                <div className={styles.searchContainer}>
                    <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                        <input
                            type="text"
                            placeholder="I have $5000, where to invest?"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className={styles.searchBar}
                        />
                        <button type="submit" className={styles.searchButton}>
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
                    </form>
                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && (
                        <div className={styles.suggestionsDropdown}>
                            {suggestions.map((topic, index) => (
                                <div
                                    key={index}
                                    className={styles.suggestionItem}
                                    onClick={() => {
                                        setSearchQuery(topic); // Autofill the search bar with the selected topic
                                        setSuggestions([]); // Clear suggestions
                                    }}
                                >
                                    {topic}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recommendations */}
                <section className={styles.recommendations}>
                    <h2 className={styles.sectionTitle}>Investment Recommendations</h2>
                    <div className={styles.recommendationsGrid}>
                        {recommendations.map((stock, index) => (
                            <div key={index} className={styles.stockCard}>
                                <h3 className={styles.stockSymbol}>{stock.symbol}</h3>
                                <p className={styles.stockName}>{stock.name}</p>
                                <p className={styles.stockPrice}>${stock.price}</p>
                                <p className={styles.stockChange} style={{ color: stock.change > 0 ? "#22c55e" : "#ef4444" }}>
                                    {stock.change > 0 ? `+${stock.change}%` : `${stock.change}%`}
                                </p>
                                {/* Display recommendation with styling */}
                                <p className={getRecommendationClass(stock.recommendation)}>
                                    {stock.recommendation}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <p className={styles.footerText}>&copy; PennyVise.</p>
            </footer>
        </div>
    );
};

export default Main;
