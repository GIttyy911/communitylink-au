import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import RegisterSW from './RegisterSW.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RegisterSW />
    <App />
  </StrictMode>
);