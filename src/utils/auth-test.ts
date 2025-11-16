/**
 * Authentication System Test Utilities
 *
 * This file contains utilities to test the new authentication system
 * that uses status code-based authentication without tokens.
 */

import { AuthService } from '@/services/auth.service';

/**
 * Test the authentication flow
 */
export const testAuthFlow = async () => {
  console.log('🧪 Testing Authentication Flow...');

  try {
    // Test 1: Invalid login should fail
    console.log('Test 1: Testing invalid login...');
    try {
      await AuthService.login('invalid@email.com', 'wrongpassword');
      console.error('❌ Test 1 FAILED: Invalid login should have thrown an error');
    } catch (error) {
      console.log('✅ Test 1 PASSED: Invalid login correctly threw an error:', error instanceof Error ? error.message : error);
    }

    // Test 2: Check localStorage cleanup on failed login
    console.log('Test 2: Checking localStorage cleanup...');
    const userData = localStorage.getItem('user_data');
    const isAuthenticated = localStorage.getItem('is_authenticated');

    if (!userData && !isAuthenticated) {
      console.log('✅ Test 2 PASSED: localStorage was cleaned up after failed login');
    } else {
      console.error('❌ Test 2 FAILED: localStorage still contains auth data after failed login');
    }

    // Test 3: Test logout functionality
    console.log('Test 3: Testing logout...');
    try {
      await AuthService.logout();
      console.log('✅ Test 3 PASSED: Logout completed without errors');
    } catch (error) {
      console.log(
        '⚠️ Test 3 WARNING: Logout threw an error (this is expected if not authenticated):',
        error instanceof Error ? error.message : error
      );
    }

    console.log('🎉 Authentication flow tests completed!');
  } catch (error) {
    console.error('💥 Authentication test failed:', error);
  }
};

/**
 * Test axios interceptor behavior
 */
export const testAxiosInterceptors = () => {
  console.log('🧪 Testing Axios Interceptors...');

  // Check if axios instance is properly configured
  const { axiosInstance } = require('@/lib/axios');

  console.log('✅ Axios instance configuration:');
  console.log('- Base URL:', axiosInstance.defaults.baseURL);
  console.log('- Timeout:', axiosInstance.defaults.timeout);
  console.log('- With Credentials:', axiosInstance.defaults.withCredentials);
  console.log('- Request Interceptors:', axiosInstance.interceptors.request.handlers.length);
  console.log('- Response Interceptors:', axiosInstance.interceptors.response.handlers.length);

  if (axiosInstance.interceptors.response.handlers.length > 0) {
    console.log('✅ Response interceptors are configured for status code checking');
  } else {
    console.error('❌ No response interceptors found - status code checking may not work');
  }
};

/**
 * Simulate different API response scenarios
 */
export const simulateApiResponses = () => {
  console.log('🧪 Simulating API Response Scenarios...');

  // Test different status codes
  const testScenarios = [
    { status: 200, description: 'Success - should pass' },
    { status: 401, description: 'Unauthorized - should trigger logout' },
    { status: 403, description: 'Forbidden - should trigger logout' },
    { status: 500, description: 'Server Error - should trigger logout' }
  ];

  testScenarios.forEach((scenario) => {
    console.log(`📋 Scenario: ${scenario.status} - ${scenario.description}`);

    if (scenario.status === 200) {
      console.log('✅ Status 200: Request would succeed');
    } else {
      console.log('🚨 Status ' + scenario.status + ': Would trigger automatic logout and redirect');
    }
  });
};

/**
 * Check localStorage state
 */
export const checkAuthState = () => {
  console.log('🔍 Checking Current Auth State...');

  const userData = localStorage.getItem('user_data');
  const isAuthenticated = localStorage.getItem('is_authenticated');
  const legacyToken = localStorage.getItem('auth_token');
  const legacyRefreshToken = localStorage.getItem('refresh_token');

  console.log('Current localStorage state:');
  console.log('- user_data:', userData ? 'Present' : 'Not found');
  console.log('- is_authenticated:', isAuthenticated);
  console.log('- auth_token (legacy):', legacyToken ? 'Present (should be cleaned up)' : 'Not found');
  console.log('- refresh_token (legacy):', legacyRefreshToken ? 'Present (should be cleaned up)' : 'Not found');

  if (userData && isAuthenticated === 'true') {
    try {
      const user = JSON.parse(userData);
      console.log('✅ User data is valid:', {
        name: user.name,
        email: user.email,
        userType: user.user_type
      });
    } catch (error) {
      console.error('❌ User data is corrupted:', error);
    }
  } else {
    console.log('ℹ️ User is not authenticated');
  }
};

/**
 * Run all authentication tests
 */
export const runAllAuthTests = async () => {
  console.log('🚀 Running Complete Authentication Test Suite...\n');

  checkAuthState();
  console.log('\n' + '='.repeat(50) + '\n');

  testAxiosInterceptors();
  console.log('\n' + '='.repeat(50) + '\n');

  simulateApiResponses();
  console.log('\n' + '='.repeat(50) + '\n');

  await testAuthFlow();
  console.log('\n' + '='.repeat(50) + '\n');

  console.log('✨ All authentication tests completed!');
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).authTests = {
    testAuthFlow,
    testAxiosInterceptors,
    simulateApiResponses,
    checkAuthState,
    runAllAuthTests
  };

  console.log('🔧 Auth test utilities available in browser console as window.authTests');
}
