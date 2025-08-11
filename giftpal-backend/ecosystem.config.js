module.exports = {
  apps: [
    {
      name: 'giftpal-api',
      script: 'server.js',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 4000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000
      },
      // Logging
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Process management
      watch: false, // Don't watch files in production
      ignore_watch: ['node_modules', 'logs', 'uploads'],
      max_memory_restart: '1G',
      
      // Auto restart configuration
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      
      // Health monitoring
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      
      // Environment variables
      env_file: '.env',
      
      // Advanced PM2 features
      kill_timeout: 5000,
      listen_timeout: 3000,
      
      // Graceful shutdown
      shutdown_with_message: true,
      
      // Source map support
      source_map_support: true,
      
      // Merge logs from all instances
      merge_logs: true,
      
      // Time zone
      time: true
    }
  ],
  
  // Deployment configuration
  deploy: {
    production: {
      user: 'deploy',
      host: ['your-production-server.com'],
      ref: 'origin/main',
      repo: 'https://github.com/your-username/giftpal-backend.git',
      path: '/var/www/giftpal-backend',
      'post-deploy': 'npm ci --only=production && pm2 reload ecosystem.config.js --env production',
      'pre-setup': 'apt update && apt install git -y'
    },
    staging: {
      user: 'deploy',
      host: ['your-staging-server.com'],
      ref: 'origin/develop',
      repo: 'https://github.com/your-username/giftpal-backend.git',
      path: '/var/www/giftpal-backend-staging',
      'post-deploy': 'npm ci && pm2 reload ecosystem.config.js --env staging',
      'pre-setup': 'apt update && apt install git -y'
    }
  }
};
