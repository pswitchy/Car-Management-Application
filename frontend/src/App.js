// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import CreateCar from './pages/CreateCar';
import EditCar from './pages/EditCar';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <CarList />
            </PrivateRoute>
          } />
          <Route path="/cars/create" element={
            <PrivateRoute>
              <CreateCar />
            </PrivateRoute>
          } />
          <Route path="/cars/:id" element={
            <PrivateRoute>
              <CarDetail />
            </PrivateRoute>
          } />
          <Route path="/cars/:id/edit" element={
            <PrivateRoute>
              <EditCar />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;