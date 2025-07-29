import './App.css'

function App() {
  return (
    <div style={{
      background: '#181312',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #FFB1EE, #ff6347)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🎁 MR GIFT
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          color: '#b8a89c'
        }}>
          Your Ultimate Gifting Platform
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'rgba(255, 177, 238, 0.1)',
            border: '1px solid rgba(255, 177, 238, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#FFB1EE', marginBottom: '0.5rem' }}>Featured Gifts</h3>
            <p style={{ color: '#b8a89c', fontSize: '0.9rem' }}>Discover amazing gifts for every occasion</p>
          </div>

          <div style={{
            background: 'rgba(255, 99, 71, 0.1)',
            border: '1px solid rgba(255, 99, 71, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#ff6347', marginBottom: '0.5rem' }}>Story Feed</h3>
            <p style={{ color: '#b8a89c', fontSize: '0.9rem' }}>Share and explore gifting stories</p>
          </div>

          <div style={{
            background: 'rgba(78, 205, 196, 0.1)',
            border: '1px solid rgba(78, 205, 196, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>Social Features</h3>
            <p style={{ color: '#b8a89c', fontSize: '0.9rem' }}>Connect with other gift enthusiasts</p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '0.8rem 1.5rem',
            background: '#ff6347',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#ff4500'}
          onMouseOut={(e) => e.target.style.background = '#ff6347'}
          onClick={() => alert('Demo Mode: Full app loading...')}>
            Explore Gifts
          </button>

          <button style={{
            padding: '0.8rem 1.5rem',
            background: 'transparent',
            color: '#FFB1EE',
            border: '1px solid #FFB1EE',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = '#FFB1EE'
            e.target.style.color = '#181312'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent'
            e.target.style.color = '#FFB1EE'
          }}
          onClick={() => alert('Demo Mode: Authentication requires API keys')}>
            Sign In (Demo)
          </button>
        </div>

        <div style={{
          marginTop: '3rem',
          padding: '1rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          fontSize: '0.9rem',
          color: '#b8a89c'
        }}>
          <p><strong>Demo Mode Active</strong></p>
          <p>To enable full functionality, configure Clerk and Stripe API keys in the .env file</p>
        </div>
      </div>
    </div>
  )
}

export default App
