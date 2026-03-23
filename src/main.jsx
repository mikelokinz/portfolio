import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log(
  "%c🕵️‍♂️ Yooo...Wassup✌🏿. \n%cSince you're poking around in my console, you should probably just hire me. Feel free to reach out via my Contact page!",
  "color: #00ff00; font-size: 20px; font-weight: bold;",
  "color: white; font-size: 14px;"
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
