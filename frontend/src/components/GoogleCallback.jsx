import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../api';

const GoogleCallback = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the code from the URL
        const code = new URLSearchParams(location.search).get('code');
        if (!code) {
          throw new Error('No authorization code received');
        }

        // Send the code to our backend
        const response = await API.get(`/google/callback${location.search}`);
        const data = response.data;
        
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          setUser(data.user);
          navigate('/profile');
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Google callback error:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, location.search, setUser]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}>
        <p>Processing Google login...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;