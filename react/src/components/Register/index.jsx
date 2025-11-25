import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import './styles.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await register(username, password);
      localStorage.setItem('token', data.token);
      navigate('/chat');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Ошибка регистрации');
      } else {
        setError('Ошибка соединения с сервером');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container" data-easytag="id1-react/src/components/Register/index.jsx">
      <div className="auth-card">
        <h1 className="auth-title">Регистрация</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Имя пользователя
            </label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
              minLength={3}
              maxLength={150}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              minLength={6}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Загрузка...' : 'Зарегистрироваться'}
          </button>
        </form>
        <div className="auth-footer">
          <p className="auth-link-text">
            Уже есть аккаунт?{' '}
            <a href="/login" className="auth-link">
              Войти
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;