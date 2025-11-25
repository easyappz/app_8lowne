import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const Home = () => {
  return <Navigate to="/login" replace />;
};

export default Home;