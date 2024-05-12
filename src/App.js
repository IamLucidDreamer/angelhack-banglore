import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/protectedRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from 'react-toastify';
import Calculator from "./components/calculator";
import MutualFundListing from "./pages/MutualFundListing";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/Signup";

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/products" element={<h1>Hello products</h1>} />
          </Route>
          <Route path="/" element={<h1>Hello</h1>} />
          <Route path="/calculator" element={<div><Calculator /> </div>} />
          <Route path="/mutual-funds" element={<div><MutualFundListing /> </div>} />
          <Route path="/login" element={<div><LoginForm /> </div>} />
          <Route path="/signup" element={<div><SignupForm /> </div>} />
        </Routes>
      </Router>
    </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
