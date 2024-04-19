import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import HomePage from "./pages/home-page/HomePage"
import PasswordRecovery from './pages/forgot-password/PasswordRecovery';
import ResponsiveAppBar from "./components/navbar/ResponsiveAppBar";
import Profile from "./pages/Profile/Profile";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import AdminDashboard from "./pages/admin-dashboard/adminDashboard";
function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/passwordreset" element={<PasswordRecovery />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/admindashboard" element={<AdminDashboard />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
