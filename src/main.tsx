// main.tsx or index.tsx — must be at the very top
import { init as initApm } from '@elastic/apm-rum';

initApm({
  serviceName: 'Spepas Web Admin',
  serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
  serviceVersion: '0.0.1',
  active: true,
  breakdownMetrics: true
});

// OPTIONAL: force it just in case
// apm.startTransaction('Page Load', 'page-load');

import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
