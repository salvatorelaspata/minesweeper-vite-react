# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Usage

Run development environment with:

```bash
npm run dev
```

> This command start vite project in web browser

Run decktop application with:

```bash
npm start
```

> This command start vite project in socketsupply runtime

Build for production with:

```bash
npm run build
```

> This command builds the project for web deployment with PWA support

# Progressive Web App (PWA) Features

This Minesweeper game is configured as a Progressive Web App, which means:

- **Offline Support**: Once installed, the game works completely offline
- **Installable**: You can add it to your home screen on mobile devices or desktop
- **Auto Updates**: The app will notify you when updates are available

## How to Install as PWA

### On Mobile (iOS/Android):
1. Open the app in your browser
2. Tap the "Share" button (iOS) or menu button (Android)
3. Select "Add to Home Screen" or "Install App"

### On Desktop (Chrome/Edge/Firefox):
1. Visit the website
2. Look for the install icon (usually a + or down arrow) in the address bar
3. Click "Install" when prompted

The app will prompt you to install it with a banner at the bottom of the screen if supported by your browser.

# Features

- Customizable difficulty levels
- Timer to track your game speed
- Mine counter
- Game state persistence
- Mobile-friendly controls
- Dark mode support

TODO

[ ] BugFix - Fix bug onContextMenu in IOS app

[ ] Feature - Build Desktop & Mobile App with SocketSupply

[ ] Feature - Manage multicolor

[ ] Multiplayer - P2P multiplayer with socketsupply

[✓] Feature - PWA with offline support