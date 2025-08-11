import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, User, ShoppingBag, Plus } from 'lucide-react';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      icon: Home,
      path: '/',
      label: 'Home'
    },
    {
      id: 'search',
      icon: Search,
      path: '/gifts',
      label: 'Search'
    },
    {
      id: 'create',
      icon: Plus,
      path: '/create',
      label: 'Create',
      isSquare: true
    },
    {
      id: 'brands',
      icon: ShoppingBag,
      path: '/brands',
      label: 'Brands'
    },
    {
      id: 'profile',
      icon: User,
      path: '/profile',
      label: 'Profile'
    }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Only show on mobile devices
  const isMobile = window.innerWidth <= 768;
  
  if (!isMobile) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
      zIndex: 1000,
      height: '60px',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: item.isSquare ? '1px solid #000' : 'none',
              borderRadius: item.isSquare ? '8px' : '0',
              padding: item.isSquare ? '8px' : '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '44px',
              minHeight: '44px'
            }}
          >
            <Icon 
              size={24} 
              color={active ? '#000' : '#6b7280'}
              fill={active && !item.isSquare ? '#000' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
