# Database Initialization Error - Troubleshooting Guide

## Error: "Could not locate the bindings file"

This error occurs when `better-sqlite3` native bindings aren't properly compiled for your system.

### Solution 1: Rebuild better-sqlite3 (Quickest)

```bash
cd backend
npm rebuild better-sqlite3
```

### Solution 2: Clean Reinstall (Recommended)

```bash
cd backend
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Or on Windows PowerShell:
# Remove-Item -Recurse -Force node_modules, package-lock.json

# Reinstall dependencies
npm install
```

### Solution 3: Install Build Tools (If above solutions fail)

`better-sqlite3` requires build tools to compile native bindings.

#### On Windows:

1. Install Visual Studio Build Tools:
   ```bash
   npm install --global windows-build-tools
   ```
   Or download from: https://visualstudio.microsoft.com/downloads/

2. Install Python (required by node-gyp):
   - Download Python from https://www.python.org/downloads/
   - Or via chocolatey: `choco install python`

3. After installing build tools, run:
   ```bash
   npm rebuild better-sqlite3
   ```

#### On Linux/Mac:

```bash
# Linux (Debian/Ubuntu)
sudo apt-get install build-essential python3

# Mac
xcode-select --install
```

### Solution 4: Use npm rebuild on install

Add this to package.json scripts:
```json
"postinstall": "npm rebuild better-sqlite3"
```

### Verify the Fix

After fixing, run:
```bash
npm run init-db
```

You should see: "Database initialized successfully!"

## Alternative: Use a Different Database Package

If issues persist, consider using `sql.js` (pure JavaScript, no native bindings):

1. Uninstall better-sqlite3:
   ```bash
   npm uninstall better-sqlite3
   ```

2. Install sql.js:
   ```bash
   npm install sql.js
   ```

3. Update database.js to use sql.js (requires code changes)
