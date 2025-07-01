// LoginDebug.jsx or LoginDebug.tsx
import axios from 'axios';
import { useEffect, useState } from 'react';

const LoginDebug = () => {
  const [loginStatus, setLoginStatus] = useState('');
  const [cookies, setCookies] = useState('');
  const [response, setResponse] = useState({});
  const [protectedResponse, setProtectedResponse] = useState({});
  const [error, setError] = useState('');

  // Configure axios to include credentials
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  // Function to parse cookies from document.cookie
  const parseCookies = () => {
    const cookiesObj = {};
    document.cookie.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name) {
        cookiesObj[name] = value;
      }
    });
    return cookiesObj;
  };

  // Display current cookies
  useEffect(() => {
    const updateCookies = () => {
      setCookies(JSON.stringify(parseCookies(), null, 2));
    };

    updateCookies();
    // Update cookies display every 2 seconds
    const interval = setInterval(updateCookies, 2000);
    return () => clearInterval(interval);
  }, []);

  // Function to simulate login
  const handleLogin = async () => {
    try {
      setLoginStatus('Logging in...');
      setError('');

      // Replace with your actual login endpoint and credentials
      const loginResponse = await axios.post(
        '/api/auth/signin',
        {
          email: 'sample@yahoo.com',
          password: 'Test123$'
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      setResponse(loginResponse.data);
      setLoginStatus('Login success! Check browser console for details.');
      console.log('Login response:', loginResponse);
      console.log('Response headers:', loginResponse.headers);
      console.log('Cookies after login:', document.cookie);
    } catch (err) {
      setError(`Login failed: ${err.message}`);
      console.error('Login error:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);
      }
    }
  };

  // Function to test protected endpoint
  const testProtectedEndpoint = async () => {
    try {
      setLoginStatus('Testing protected endpoint...');
      setError('');

      // Add all request headers for debugging
      const headers = {
        'Content-Type': 'application/json'
      };

      // Let's also manually attach cookies for testing
      const cookiesObj = parseCookies();

      const testResponse = await axios.get('/api/protected-endpoint', {
        headers,
        withCredentials: true
      });

      setProtectedResponse(testResponse.data);
      setLoginStatus('Protected endpoint access successful!');
      console.log('Protected response:', testResponse);
    } catch (err) {
      setError(`Protected endpoint access failed: ${err.message}`);
      console.error('Protected endpoint error:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        console.error('Error status:', err.response.status);
        console.error('Error headers:', err.response.headers);
      }
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>

      <div className="mb-4">
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Test Login
        </button>
        <button onClick={testProtectedEndpoint} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Test Protected Endpoint
        </button>
      </div>

      <div className="mb-4">
        <p className="font-semibold">
          Status: <span className="text-blue-600">{loginStatus}</span>
        </p>
        {error && <p className="text-red-500">{error}</p>}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Current Cookies:</h2>
        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-40">{cookies || 'No cookies found'}</pre>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Login Response:</h2>
        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-40">
          {Object.keys(response).length > 0 ? JSON.stringify(response, null, 2) : 'No response yet'}
        </pre>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Protected Endpoint Response:</h2>
        <pre className="bg-gray-100 p-3 rounded overflow-auto max-h-40">
          {Object.keys(protectedResponse).length > 0 ? JSON.stringify(protectedResponse, null, 2) : 'No response yet'}
        </pre>
      </div>
    </div>
  );
};

export default LoginDebug;
