import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";

import { StocksProvider } from "./context/StocksContext";

const Home = React.lazy(() => import("./pages/Home/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));

const Error = React.lazy(() => import("./pages/Error/Error"));
const ComingSoon = React.lazy(() => import("./pages/ComingSoon/ComingSoon"));
const Login = React.lazy(() => import("./pages/Login/Login.jsx"));
const Signup = React.lazy(() => import("./pages/Signup/Signup.jsx"));
const About = React.lazy(() => import("./pages/About/About.jsx"));


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <StocksProvider>
      <React.Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
 
        </Routes>
      </React.Suspense>
      
    </StocksProvider>
  );
};

export default App;
