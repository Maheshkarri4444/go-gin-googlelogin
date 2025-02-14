import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../api';

const GoogleCallback = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const processedRef = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // If already processed this code, skip
      if (processedRef.current) {
        return;
      }

      try {
        const code = new URLSearchParams(location.search).get('code');
        if (!code) {
          throw new Error('No authorization code received');
        }

        // Mark as processed before making the request
        processedRef.current = true;

        // Send the code to our backend
        const response = await API.get(`/google/callback?code=${code}`);
        console.log('Backend response:', response.data);
        
        if (response.data.token && response.data.user) {
          localStorage.setItem('token', response.data.token);
          setUser(response.data.user);
          navigate('/profile');
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (error) {
        console.error('Google callback error:', error);
        // Only show alert and navigate if we haven't processed successfully
        if (processedRef.current) {
          alert('Failed to complete Google login. Please try again.');
          navigate('/login');
        }
      }
    };

    handleCallback();

    // Cleanup function
    return () => {
      processedRef.current = false;
    };
  }, [location.search, navigate, setUser]);

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