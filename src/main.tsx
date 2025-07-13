import { init as initApm } from '@elastic/apm-rum';

async function getClientIP(): Promise<string | null> {
  try {
    // const res = await fetch('https://api.ipify.org?format=json');
    const res = await fetch('https://api.spepas.com/client-ip');
    const data = await res.json();

    console.log('API Gateway============================, ', data);
    return data.ip;
  } catch {
    return null;
  }
}

(async () => {
  const ip = await getClientIP();

  const apm = initApm({
    serviceName: 'Spepas Web Admin',
    serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
    serviceVersion: '0.0.1',
    active: true,
    breakdownMetrics: true,
    distributedTracingOrigins: ['*'],
    pageLoadTransactionName: 'Spepas Initial Load'
  });

  // Attach IP as soon as the initial transaction starts
  // Wait for APM initialization to complete
  // const checkAndLabel = () => {
  //   const txn = apm.getCurrentTransaction();
  //   if (txn && ip) {
  //     txn.addLabels({ 'client.ip': ip });
  //     console.log('🚀 IP Address=================:', ip);
  //     console.log('🚀 Label applied to transaction:', txn);
  //   } else {
  //     console.log('⚠️ No transaction available yet, retrying...');
  //     setTimeout(checkAndLabel, 100); // retry until available
  //   }
  // };

  // checkAndLabel();
  apm.observe('transaction:start', function (transaction) {
    if (ip) {
      console.log('🚀 IP Address=================:', ip);
      transaction.addLabels({ 'client.ip': ip });
    }
  });
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
