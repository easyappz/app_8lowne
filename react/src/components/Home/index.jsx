import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/chat');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div data-easytag="id1-react/src/components/Home/index.jsx">
      <p>Загрузка...</p>
    </div>
  );
};

export default Home;