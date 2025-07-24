import React from 'react';

const SimpleLoginTest = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#1a1a1a', 
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: '#2a2a2a',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px'
      }}>
        <h1 style={{ marginBottom: '1rem' }}>🎉 Login Component Works!</h1>
        <p style={{ marginBottom: '2rem', color: '#ccc' }}>
          The route is working correctly. This is a test component to verify the setup.
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <input 
            type="email" 
            placeholder="Email" 
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '4px',
              border: '1px solid #555',
              backgroundColor: '#333',
              color: 'white'
            }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1rem',
              borderRadius: '4px',
              border: '1px solid #555',
              backgroundColor: '#333',
              color: 'white'
            }}
          />
        </div>
        <button style={{
          backgroundColor: '#0066cc',
          color: 'white',
          padding: '0.75rem 2rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          Sign In to GIFTPAL
        </button>
      </div>
    </div>
  );
};

export default SimpleLoginTest;
