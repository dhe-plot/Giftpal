# GIFTPAL App Sync Utility

This utility helps keep the `mr-gift-app` and `giftpal-app` directories in sync during development.

## Quick Start

### Windows
```bash
# Sync mr-gift-app to giftpal-app (default)
sync.bat

# Sync giftpal-app to mr-gift-app
sync.bat from-giftpal

# Sync both ways based on file modification times
sync.bat bidirectional

# Watch for changes and auto-sync
sync.bat watch
```

### Cross-platform (Node.js)
```bash
# Install dependencies first
npm install

# Sync mr-gift-app to giftpal-app (default)
npm run sync

# Sync giftpal-app to mr-gift-app
npm run sync:from-giftpal

# Sync both ways
npm run sync:bidirectional

# Direct node commands
node sync-apps.js
node sync-apps.js from-giftpal
node sync-apps.js bidirectional
node sync-apps.js watch
```

## What Gets Synced

The sync utility copies the following files and directories:
- `src/**/*` - All source code files
- `public/**/*` - Public assets
- `index.html` - Main HTML file
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.node.json` - Node TypeScript configuration
- `eslint.config.js` - ESLint configuration

## What Gets Excluded

- `node_modules/` - Dependencies (install separately)
- `dist/` - Build output
- `package-lock.json` - Lock files (generated automatically)
- `.git/` - Git files
- `*.log` - Log files

## Sync Modes

### 1. Default Sync (`to-giftpal`)
Copies files from `mr-gift-app` to `giftpal-app`. This is the default mode.

### 2. Reverse Sync (`from-giftpal`)
Copies files from `giftpal-app` to `mr-gift-app`.

### 3. Bidirectional Sync
Compares file modification times and syncs newer files in both directions.

### 4. Watch Mode
Monitors both directories for changes and automatically syncs when files are modified.

## Development Workflow

### Option 1: Work in mr-gift-app (Recommended)
1. Make changes in `mr-gift-app`
2. Run `sync.bat` or `npm run sync` to sync to `giftpal-app`
3. Vercel deploys from `giftpal-app`

### Option 2: Work in giftpal-app
1. Make changes in `giftpal-app`
2. Run `sync.bat from-giftpal` or `npm run sync:from-giftpal` to sync to `mr-gift-app`
3. Vercel deploys from `giftpal-app`

### Option 3: Use Watch Mode
1. Run `sync.bat watch` or `npm run sync:watch`
2. Work in either directory
3. Changes are automatically synced to the other directory

## Package.json Scripts

The root `package.json` includes these convenience scripts:

```json
{
  "scripts": {
    "sync": "node sync-apps.js",
    "sync:to-giftpal": "node sync-apps.js to-giftpal",
    "sync:from-giftpal": "node sync-apps.js from-giftpal",
    "sync:bidirectional": "node sync-apps.js bidirectional",
    "dev:giftpal": "cd giftpal-app && npm run dev",
    "dev:mr-gift": "cd mr-gift-app && npm run dev",
    "build:giftpal": "cd giftpal-app && npm run build",
    "build:mr-gift": "cd mr-gift-app && npm run build",
    "install:all": "cd giftpal-app && npm install && cd ../mr-gift-app && npm install"
  }
}
```

## Initial Setup

1. Run the initial sync to ensure both directories are in sync:
   ```bash
   npm run sync:bidirectional
   ```

2. Install dependencies in both directories:
   ```bash
   npm run install:all
   ```

3. Start development in your preferred directory:
   ```bash
   npm run dev:giftpal
   # or
   npm run dev:mr-gift
   ```

## Troubleshooting

### Files not syncing
- Check that the file patterns match the `SYNC_PATTERNS` in `sync-apps.js`
- Ensure the file is not in the `EXCLUDE_PATTERNS`

### Watch mode not working
- Install chokidar: `npm install chokidar`
- Make sure Node.js version is 16 or higher

### Permission errors
- Run the command prompt as administrator on Windows
- Check file permissions on the directories

## Deployment

The Vercel deployment is configured to build from the `giftpal-app` directory. After making changes:

1. Sync your changes to `giftpal-app` if working in `mr-gift-app`
2. Commit and push to trigger deployment
3. Vercel will automatically deploy the latest changes

## Notes

- The sync utility preserves file modification times for bidirectional sync
- Package.json dependencies are merged, not overwritten
- Always test your changes in both directories if using bidirectional sync
- Consider using watch mode during active development for seamless syncing
