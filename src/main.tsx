import { init as initApm } from '@elastic/apm-rum';

async function getClientIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
  } catch {
    console.log('Error fetching public ip address=============================');
    return null;
  }
}

(async () => {
  const ip = await getClientIP();
  console.log('Client IP======================================:', ip);

  const apm = initApm({
    serviceName: 'Spepas Web Admin',
    serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
    serviceVersion: '0.0.1',
    active: true,
    breakdownMetrics: true,
    distributedTracingOrigins: ['*'],
    pageLoadTransactionName: 'Spepas Initial Load'
  });

  if (ip) {
    apm.setCustomContext({ client: { ip } });
  }
})();

import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

// initApm({
//   serviceName: 'Spepas Web Admin',
//   serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
//   serviceVersion: '0.0.1',
//   active: true
// });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
