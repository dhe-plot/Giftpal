import React from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/giftpal_logo.png'

export default function LandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #181312 60%, #1a1a2e 100%)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '960px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <img src={logo} alt="GIFTPAL" style={{ width: 40, height: 40, borderRadius: '50%' }} />
            <span style={{ fontWeight: 800, letterSpacing: '1px' }}>GIFTPAL</span>
          </div>
          <h1 style={{ fontSize: '3rem', lineHeight: 1.1, margin: 0, marginBottom: '1rem', background: 'linear-gradient(135deg, #FFB1EE, #5E9BFF)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Find the perfect gift in minutes
          </h1>
          <p style={{ color: '#b0b8c1', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            AI-powered recommendations, curated brands, and social proof that turns gifting into a joy — not a chore.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/gifts" style={{
              background: 'linear-gradient(135deg, #FFB1EE, #5E9BFF)',
              color: '#111',
              padding: '0.9rem 1.4rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 800
            }}>Browse Gifts</Link>
            <Link to="/" style={{
              border: '1px solid #333',
              color: '#fff',
              padding: '0.9rem 1.4rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 600
            }}>Enter App</Link>
          </div>
        </div>
        <div style={{
          background: '#111',
          border: '1px solid #2b2f36',
          borderRadius: '16px',
          minHeight: 300,
          padding: '1rem',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#b0b8c1', marginBottom: '0.5rem' }}>Preview</div>
            <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>Smart Gift Discovery</div>
            <div style={{ color: '#b0b8c1', marginTop: '0.5rem' }}>Personalized picks based on occasion, recipient, and style</div>
          </div>
        </div>
      </div>
    </div>
  )
}


