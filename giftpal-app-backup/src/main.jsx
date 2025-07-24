import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { ClerkProvider } from '@clerk/clerk-react'
import './index.css'
import App from './App.jsx'
import { LoadingProvider } from './providers/LoadingProvider.jsx'
import { AuthProvider } from './providers/AuthProvider.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

console.log('🎁 Starting GIFTPAL App...')
console.log('Clerk Key:', PUBLISHABLE_KEY ? 'Present' : 'Missing')
console.log('Environment:', import.meta.env.MODE)

if (!PUBLISHABLE_KEY) {
  console.warn('Missing Clerk Publishable Key - running in demo mode')
}

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#181312' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

console.log('main.jsx executing...');

const root = document.getElementById('root');
console.log('Root element:', root);



createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>,
)
