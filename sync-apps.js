#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SOURCE_DIR = 'mr-gift-app';
const TARGET_DIR = 'giftpal-app';

// Files and directories to sync
const SYNC_PATTERNS = [
  'src/**/*',
  'public/**/*',
  'index.html',
  'package.json',
  'vite.config.js',
  'tsconfig.json',
  'tsconfig.node.json',
  'eslint.config.js'
];

// Files to exclude from sync
const EXCLUDE_PATTERNS = [
  'node_modules/**/*',
  'dist/**/*',
  'package-lock.json',
  '.git/**/*',
  '*.log'
];

function log(message) {
  console.log(`[SYNC] ${new Date().toISOString()} - ${message}`);
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`Created directory: ${dirPath}`);
  }
}

function copyFile(src, dest) {
  try {
    const destDir = path.dirname(dest);
    ensureDirectoryExists(destDir);
    
    fs.copyFileSync(src, dest);
    log(`Copied: ${src} -> ${dest}`);
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error.message);
  }
}

function getFilesRecursively(dir, basePath = '') {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(basePath, item);
    
    // Skip excluded patterns
    if (EXCLUDE_PATTERNS.some(pattern => {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
      return regex.test(relativePath);
    })) {
      continue;
    }
    
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getFilesRecursively(fullPath, relativePath));
    } else {
      files.push({
        fullPath,
        relativePath
      });
    }
  }
  
  return files;
}

function syncDirectories(source, target, direction = 'source-to-target') {
  log(`Starting sync: ${source} -> ${target} (${direction})`);
  
  const sourceFiles = getFilesRecursively(source);
  let syncedCount = 0;
  
  for (const file of sourceFiles) {
    // Check if file matches sync patterns
    const shouldSync = SYNC_PATTERNS.some(pattern => {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
      return regex.test(file.relativePath);
    });
    
    if (!shouldSync) {
      continue;
    }
    
    const targetPath = path.join(target, file.relativePath);
    
    // Check if target file exists and compare modification times
    let shouldCopy = true;
    
    if (fs.existsSync(targetPath)) {
      const sourceStats = fs.statSync(file.fullPath);
      const targetStats = fs.statSync(targetPath);
      
      // Only copy if source is newer
      if (direction === 'source-to-target' && sourceStats.mtime <= targetStats.mtime) {
        shouldCopy = false;
      } else if (direction === 'target-to-source' && targetStats.mtime <= sourceStats.mtime) {
        shouldCopy = false;
      }
    }
    
    if (shouldCopy) {
      if (direction === 'source-to-target') {
        copyFile(file.fullPath, targetPath);
      } else {
        copyFile(targetPath, file.fullPath);
      }
      syncedCount++;
    }
  }
  
  log(`Sync completed: ${syncedCount} files synced`);
}

function syncPackageJson() {
  const sourcePkg = path.join(SOURCE_DIR, 'package.json');
  const targetPkg = path.join(TARGET_DIR, 'package.json');
  
  if (fs.existsSync(sourcePkg) && fs.existsSync(targetPkg)) {
    const sourceContent = JSON.parse(fs.readFileSync(sourcePkg, 'utf8'));
    const targetContent = JSON.parse(fs.readFileSync(targetPkg, 'utf8'));
    
    // Merge dependencies and devDependencies
    targetContent.dependencies = { ...targetContent.dependencies, ...sourceContent.dependencies };
    targetContent.devDependencies = { ...targetContent.devDependencies, ...sourceContent.devDependencies };
    targetContent.scripts = { ...targetContent.scripts, ...sourceContent.scripts };
    
    fs.writeFileSync(targetPkg, JSON.stringify(targetContent, null, 2));
    log('Merged package.json dependencies and scripts');
  }
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'sync';
  
  switch (command) {
    case 'sync':
    case 'to-giftpal':
      // Sync from mr-gift-app to giftpal-app
      syncDirectories(SOURCE_DIR, TARGET_DIR, 'source-to-target');
      syncPackageJson();
      break;
      
    case 'from-giftpal':
      // Sync from giftpal-app to mr-gift-app
      syncDirectories(TARGET_DIR, SOURCE_DIR, 'target-to-source');
      break;
      
    case 'bidirectional':
      // Sync both ways based on file modification times
      log('Starting bidirectional sync...');
      
      // First, sync newer files from mr-gift-app to giftpal-app
      syncDirectories(SOURCE_DIR, TARGET_DIR, 'source-to-target');
      
      // Then, sync newer files from giftpal-app to mr-gift-app
      syncDirectories(TARGET_DIR, SOURCE_DIR, 'target-to-source');
      
      syncPackageJson();
      break;
      
    case 'watch':
      log('Starting watch mode...');
      try {
        const chokidar = require('chokidar');

        // Watch both directories
        const watcher1 = chokidar.watch(path.join(SOURCE_DIR, 'src'), {
          ignored: /(^|[\/\\])\../,
          persistent: true,
          ignoreInitial: true
        });

        const watcher2 = chokidar.watch(path.join(TARGET_DIR, 'src'), {
          ignored: /(^|[\/\\])\../,
          persistent: true,
          ignoreInitial: true
        });

        watcher1.on('change', (filePath) => {
          log(`File changed in ${SOURCE_DIR}: ${filePath}`);
          setTimeout(() => syncDirectories(SOURCE_DIR, TARGET_DIR, 'source-to-target'), 500);
        });

        watcher2.on('change', (filePath) => {
          log(`File changed in ${TARGET_DIR}: ${filePath}`);
          setTimeout(() => syncDirectories(TARGET_DIR, SOURCE_DIR, 'target-to-source'), 500);
        });

        log('Watching for file changes... Press Ctrl+C to stop');

        // Keep the process running
        process.on('SIGINT', () => {
          log('Stopping file watcher...');
          watcher1.close();
          watcher2.close();
          process.exit(0);
        });

      } catch (error) {
        console.error('Watch mode requires chokidar. Install it with: npm install chokidar');
        console.log('Falling back to manual sync mode.');
      }
      break;
      
    default:
      console.log(`
Usage: node sync-apps.js [command]

Commands:
  sync, to-giftpal    Sync from mr-gift-app to giftpal-app (default)
  from-giftpal        Sync from giftpal-app to mr-gift-app  
  bidirectional       Sync both ways based on file modification times
  watch               Watch for changes and sync automatically (not implemented)

Examples:
  node sync-apps.js                    # Sync mr-gift-app -> giftpal-app
  node sync-apps.js from-giftpal       # Sync giftpal-app -> mr-gift-app
  node sync-apps.js bidirectional      # Sync both ways
      `);
  }
}

if (require.main === module) {
  main();
}

module.exports = { syncDirectories, syncPackageJson };
