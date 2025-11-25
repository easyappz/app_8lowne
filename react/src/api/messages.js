import instance from './axios';

/**
 * Get all chat messages
 * @returns {Promise} Response with array of messages
 */
export const getMessages = async () => {
  const token = localStorage.getItem('token');
  const response = await instance.get('/api/messages/', {
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  return response.data;
};

/**
 * Send a new message
 * @param {string} text - Message text content
 * @returns {Promise} Response with created message data
 */
export const sendMessage = async (text) => {
  const token = localStorage.getItem('token');
  const response = await instance.post('/api/messages/', 
    { text },
    {
      headers: {
        'Authorization': `Token ${token}`
      }
    }
  );
  return response.data;
};
