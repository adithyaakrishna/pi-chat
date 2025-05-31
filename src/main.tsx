import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Add the global type for completeWelcome
declare global {
  interface Window {
    completeWelcome?: () => void;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
