import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../../api/auth';
import './styles.css';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const data = await getProfile();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить профиль');
        setLoading(false);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="profile-container" data-easytag="id1-src/components/Profile/index.jsx">
        <div className="profile-loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container" data-easytag="id1-src/components/Profile/index.jsx">
        <div className="profile-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="profile-container" data-easytag="id1-src/components/Profile/index.jsx">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Профиль</h1>
        </div>
        
        <div className="profile-content">
          <div className="profile-info">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {profile?.username?.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div className="profile-details">
              <div className="profile-field">
                <label>Имя пользователя</label>
                <div className="profile-value">{profile?.username}</div>
              </div>
              
              <div className="profile-field">
                <label>ID</label>
                <div className="profile-value">{profile?.id}</div>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button 
              className="logout-button" 
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;