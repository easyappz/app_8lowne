import instance from './axios';

/**
 * Register a new user
 * @param {string} username - Username for the new account
 * @param {string} password - Password for the new account
 * @returns {Promise} Response with user data and token
 */
export const register = async (username, password) => {
  const response = await instance.post('/api/register/', {
    username,
    password
  });
  return response.data;
};

/**
 * Login user
 * @param {string} username - Username
 * @param {string} password - User password
 * @returns {Promise} Response with user data and token
 */
export const login = async (username, password) => {
  const response = await instance.post('/api/login/', {
    username,
    password
  });
  return response.data;
};

/**
 * Get current user profile
 * @returns {Promise} Response with user profile data
 */
export const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await instance.get('/api/profile/', {
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  return response.data;
};
