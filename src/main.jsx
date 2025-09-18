import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import i18n from './i18n/config';
import App from './App';
import './assets/styles/main.css';

// Initialize i18n
i18n.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>,
);
