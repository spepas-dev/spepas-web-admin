# Authentication System Documentation

## Overview

This document describes the updated authentication system that uses **status code-based authentication** without tokens. The system automatically logs out users and redirects to login for any API response with a status code other than 200.

## Key Changes

### 🔄 **From Token-Based to Status Code-Based Authentication**

**Before:**

- Used JWT tokens and refresh tokens
- Token validation and refresh logic
- Manual token management

**After:**

- Cookie-based authentication with `withCredentials: true`
- Status code 200 = authenticated
- Any other status code = automatic logout
- Simplified state management

## Architecture

### 1. **Auth Slice** (`/src/stores/slices/auth.slice.ts`)

**Removed:**

- `token` and `refresh_token` state
- Token management actions
- Complex token validation

**Added:**

- `clearAuth()` action for comprehensive cleanup
- Enhanced error handling
- User data validation
- Persistent storage using localStorage

**Key Features:**

```typescript
interface AuthSlice {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    logout: (navigate?: NavigateFunction) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    checkAuth: () => void;
    clearAuth: () => void; // New: comprehensive cleanup
  };
}
```

### 2. **Axios Configuration** (`/src/lib/axios.ts`)

**Global Authentication Interceptor:**

- **Request Interceptor:** Adds timing metadata for debugging
- **Response Interceptor:**
  - ✅ Status 200: Request succeeds
  - ❌ Any other status: Automatic logout + redirect

**Key Features:**

```typescript
// Global auth failure handler
const handleAuthFailure = () => {
  // Clear all auth data
  localStorage.removeItem('user_data');
  localStorage.removeItem('is_authenticated');
  // ... other cleanup

  // Redirect to login
  if (!window.location.pathname.includes('/auth/login')) {
    window.location.replace('/auth/login');
  }
};
```

**Smart Login Endpoint Detection:**

- Skips auth failure handling for login endpoints to prevent infinite loops
- Handles network errors and request setup errors

### 3. **Auth Service** (`/src/services/auth.service.ts`)

**Enhanced Error Handling:**

```typescript
// Specific error messages based on status codes
switch (status) {
  case 401:
    return 'Invalid email or password';
  case 403:
    return 'Account is disabled or suspended';
  case 429:
    return 'Too many login attempts. Please try again later';
  case 500:
    return 'Server error. Please try again later';
  default:
    return serverMessage || `Login failed with status ${status}`;
}
```

**Response Structure Flexibility:**

```typescript
// Handles both possible response structures
const user = response.filtered?.user || response.user;
```

### 4. **API Service** (`/src/services/api.service.ts`)

**Simplified Implementation:**

- Removed manual status code checking (handled by axios interceptors)
- Added comprehensive error logging
- Enhanced with file upload/download capabilities
- Better TypeScript support

## Security Features

### 🔒 **Automatic Session Management**

1. **Global Status Code Monitoring:**

   - Every API call is monitored
   - Non-200 status = immediate logout
   - Prevents unauthorized access

2. **Comprehensive Data Cleanup:**

   ```typescript
   clearAuth: () => {
     localStorage.removeItem('user_data');
     localStorage.removeItem('is_authenticated');
     localStorage.removeItem('auth_token'); // Legacy cleanup
     localStorage.removeItem('refresh_token'); // Legacy cleanup
   };
   ```

3. **Redirect Loop Prevention:**
   ```typescript
   const currentPath = window.location.pathname;
   if (!currentPath.includes('/auth/login')) {
     window.location.replace('/auth/login');
   }
   ```

### 🛡️ **Error Handling Strategy**

**Network Errors:** Trigger logout for security (except login endpoints)
**Server Errors:** Trigger logout for security
**Request Setup Errors:** Trigger logout for security

## Usage Examples

### 1. **Login Process**

```typescript
// In your login component
const handleLogin = async (email: string, password: string) => {
  try {
    await authStore.actions.login(email, password);
    // Success: User is automatically authenticated
    navigate('/dashboard');
  } catch (error) {
    // Error: User data is automatically cleared
    console.error('Login failed:', error.message);
  }
};
```

### 2. **Making API Calls**

```typescript
// Any API call will automatically handle authentication
const fetchUserData = async () => {
  try {
    const data = await ApiService.get('/user/profile');
    // Status 200: Success
    return data;
  } catch (error) {
    // Non-200 status: User is automatically logged out
    // No need for manual error handling
  }
};
```

### 3. **Checking Authentication State**

```typescript
// On app initialization
useEffect(() => {
  authStore.actions.checkAuth();
}, []);
```

## Testing

### 🧪 **Test Utilities**

A comprehensive test suite is available in `/src/utils/auth-test.ts`:

```typescript
// In browser console
window.authTests.runAllAuthTests();

// Individual tests
window.authTests.checkAuthState();
window.authTests.testAuthFlow();
window.authTests.testAxiosInterceptors();
```

### 📋 **Test Scenarios**

1. **Invalid Login:** Should fail and clear localStorage
2. **Network Errors:** Should trigger logout (except login)
3. **Server Errors:** Should trigger logout
4. **Status Code Validation:** Only 200 should succeed
5. **localStorage Cleanup:** Should remove all auth data on logout

## Migration Guide

### 🔄 **From Old System**

1. **Remove Token References:**

   ```typescript
   // Remove these
   const token = localStorage.getItem('auth_token');
   const refreshToken = localStorage.getItem('refresh_token');

   // Use these instead
   const userData = localStorage.getItem('user_data');
   const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';
   ```

2. **Update API Calls:**

   ```typescript
   // Old: Manual error handling
   try {
     const response = await api.get('/data');
     if (response.status !== 200) {
       // Manual logout logic
     }
   } catch (error) {
     // Manual error handling
   }

   // New: Automatic handling
   try {
     const data = await ApiService.get('/data');
     // Success - no manual checks needed
   } catch (error) {
     // Error - user is automatically logged out
   }
   ```

3. **Update Auth Checks:**

   ```typescript
   // Old: Token-based
   const isAuthenticated = !!token && !!user;

   // New: User-based
   const isAuthenticated = !!user;
   ```

## Configuration

### 🔧 **Axios Configuration**

```typescript
export const axiosInstance = axios.create({
  baseURL: 'https://api.spepas.com/api/gateway/v1',
  timeout: 10000,
  withCredentials: true, // Essential for cookie-based auth
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});
```

### 📊 **Debugging**

Enable debug logging:

```typescript
// In browser console
localStorage.setItem('debug', 'auth:*');

// Or set log level
console.debug = console.log; // Enable debug logs
```

## Best Practices

### ✅ **Do's**

1. **Always use ApiService** for API calls
2. **Let axios interceptors handle authentication**
3. **Use the auth store for state management**
4. **Test with different status codes**
5. **Monitor browser console for auth logs**

### ❌ **Don'ts**

1. **Don't manually check status codes** (axios handles this)
2. **Don't store tokens** (cookie-based auth)
3. **Don't bypass the auth system**
4. **Don't ignore auth errors**
5. **Don't modify localStorage auth data manually**

## Troubleshooting

### 🐛 **Common Issues**

1. **Infinite Redirect Loops:**

   - Check if login endpoint is properly excluded
   - Verify redirect logic in `handleAuthFailure()`

2. **Session Not Persisting:**

   - Ensure `withCredentials: true` is set
   - Check server CORS configuration
   - Verify cookie settings

3. **Unexpected Logouts:**

   - Check API responses for non-200 status codes
   - Review server error logs
   - Monitor network tab in browser

4. **localStorage Issues:**
   - Clear browser storage and retry
   - Check for corrupted user data
   - Verify JSON parsing in `checkAuth()`

### 🔍 **Debug Commands**

```typescript
// Check current auth state
window.authTests.checkAuthState();

// Test authentication flow
window.authTests.testAuthFlow();

// Clear all auth data
localStorage.clear();

// Check axios configuration
console.log(axiosInstance.defaults);
```

## Security Considerations

### 🔐 **Security Features**

1. **Automatic Session Invalidation:** Any API error triggers logout
2. **Comprehensive Data Cleanup:** All auth data is removed on logout
3. **Redirect Protection:** Prevents infinite redirect loops
4. **Input Validation:** User data structure is validated
5. **Error Logging:** All auth errors are logged for monitoring

### ⚠️ **Security Notes**

- **Cookie Security:** Ensure cookies are HttpOnly and Secure in production
- **CORS Configuration:** Properly configure CORS for `withCredentials`
- **Error Messages:** Don't expose sensitive information in error messages
- **Session Timeout:** Implement server-side session timeout
- **Rate Limiting:** Implement rate limiting for login attempts

---

## Summary

The new authentication system provides:

- ✅ **Simplified State Management:** No token handling
- ✅ **Automatic Security:** Status code-based logout
- ✅ **Better Error Handling:** Comprehensive error messages
- ✅ **Enhanced Debugging:** Detailed logging and test utilities
- ✅ **Improved UX:** Seamless authentication flow
- ✅ **Security First:** Automatic session invalidation

This system ensures that users are automatically logged out and redirected to login whenever any API call returns a non-200 status code, maintaining security and session integrity throughout the application.
