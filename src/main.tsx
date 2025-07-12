import './index.css';

import { init as initApm } from '@elastic/apm-rum';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

// async function getClientIP() {
//   try {
//     const res = await fetch('https://api.ipify.org?format=json');
//     console.log('Response From Client=================================, ', res);
//     const data = await res.json();
//     return data.ip; // e.g., "203.0.113.42"
//   } catch {
//     return null;
//   }
// }

// getClientIP().then((ip) => {
//   console.log('Client Side IP Address=============================, ', ip);
//   const apm = initApm({
//     serviceName: 'Spepas Web Admin',
//     serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
//     serviceVersion: '0.0.1',
//     active: true
//   });

//   if (ip) {
//     apm.setCustomContext({
//       client: {
//         ip
//       }
//     });
//   }
// });

initApm({
  serviceName: 'Spepas Web Admin',
  serverUrl: import.meta.env.VITE_ELASTIC_APM_SERVER,
  serviceVersion: '0.0.1',
  active: true
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
