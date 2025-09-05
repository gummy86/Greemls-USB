import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Workbox } from 'workbox-window';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register Service Worker for PWA (autoUpdate handled by VitePWA)
if ('serviceWorker' in navigator) {
  const swUrl = '/sw.js';
  const workbox = new Workbox(swUrl);

  workbox.addEventListener('waiting', () => {
    workbox.messageSW({ type: 'SKIP_WAITING' });
  });

  workbox.addEventListener('controlling', () => {
    window.location.reload();
  });

  workbox.register();
}
