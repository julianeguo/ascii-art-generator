import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import './index.css';

//  basename="/ascii-art-generator"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
