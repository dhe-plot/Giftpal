import React from 'react'
import ReactDOM from 'react-dom/client'

function TestApp() {
  return (
    <div style={{ 
      background: '#181312', 
      color: 'white', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontSize: '24px'
    }}>
      <h1>🎁 MR GIFT Test - React is Working!</h1>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestApp />
  </React.StrictMode>,
)
