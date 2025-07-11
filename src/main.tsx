import './index.css';

import { init } from '@elastic/apm-rum';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

init({
  serviceName: 'Spepas Web Admin',
  serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
  serviceVersion: '0.0.1',
  active: true
  // breakdownMetrics: true,
  // distributedTracingOrigins: ['*']
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
