# API Endpoints Documentation

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Dashboard & Overview](#dashboard--overview)
4. [Order Management](#order-management)
5. [User Management](#user-management)
6. [Inventory Management](#inventory-management)
7. [Access Management](#access-management)
8. [Wallet Management](#wallet-management)
9. [Reference Data](#reference-data)
10. [Search & Filtering](#search--filtering)
11. [Theme & UI Configuration](#theme--ui-configuration)
12. [Implementation Guidelines](#implementation-guidelines)

---

## Overview

This document outlines all the API endpoints required to replace hardcoded data in the Spepas application. The backend engineer should implement these endpoints to provide dynamic, real-time data instead of the current static mock data.

### Base URL

All endpoints are prefixed with `/api`

### Authentication

- **Protected endpoints** require a valid authentication token in the Authorization header
- **Public endpoints** do not require authentication

### Response Format

All successful responses follow this format:

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "message": "Success message"
}
```

### Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}
```

---

## Authentication

### Login

- **Endpoint**: `POST /api/auth/login`
- **Description**: User login and get authentication token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string",
    "user": "object"
  }
  ```
- **Authentication**: No

### Logout

- **Endpoint**: `POST /api/auth/logout`
- **Description**: User logout
- **Request Body**: None
- **Response**:
  ```json
  {
    "message": "string"
  }
  ```
- **Authentication**: Yes

### Refresh Token

- **Endpoint**: `POST /api/auth/refresh`
- **Description**: Refresh access token
- **Request Body**:
  ```json
  {
    "refreshToken": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string",
    "user": "object"
  }
  ```
- **Authentication**: No

---

## Dashboard & Overview

### Dashboard Statistics

- **Endpoint**: `GET /api/dashboard/stats`
- **Description**: Fetch main dashboard statistics
- **Response**:
  ```json
  {
    "totalUsers": "number",
    "activeRiders": "number",
    "registeredVehicles": "number",
    "paymentMethods": "number",
    "trends": {
      "totalUsers": "string",
      "activeRiders": "string",
      "registeredVehicles": "string",
      "paymentMethods": "string"
    }
  }
  ```
- **Authentication**: Yes

### Activity Feed

- **Endpoint**: `GET /api/dashboard/activity`
- **Description**: Fetch recent activity feed
- **Response**:
  ```json
  {
    "activities": [
      {
        "title": "string",
        "time": "string",
        "description": "string",
        "type": "string"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Quick Actions

- **Endpoint**: `GET /api/dashboard/quick-actions`
- **Description**: Fetch quick action buttons
- **Response**:
  ```json
  {
    "actions": [
      {
        "title": "string",
        "description": "string",
        "path": "string",
        "color": "string"
      }
    ]
  }
  ```
- **Authentication**: Yes

---

## Order Management

### Spare Parts

- **Endpoint**: `GET /api/spare-parts`
- **Description**: Fetch all spare parts
- **Response**:
  ```json
  {
    "spareParts": [
      {
        "id": "string",
        "name": "string",
        "category": "string",
        "condition": "string",
        "price": "number",
        "stock": "number",
        "manufacturer": "string",
        "bids": "number"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Spare Parts Statistics

- **Endpoint**: `GET /api/spare-parts/stats`
- **Description**: Fetch spare parts statistics
- **Response**:
  ```json
  {
    "totalParts": "number",
    "activeBids": "number",
    "totalRevenue": "number",
    "trends": {
      "totalParts": "string",
      "activeBids": "string",
      "totalRevenue": "string"
    }
  }
  ```
- **Authentication**: Yes

### Sellers

- **Endpoint**: `GET /api/sellers`
- **Description**: Fetch all sellers with stats
- **Response**:
  ```json
  {
    "sellers": [
      {
        "id": "number",
        "Seller_ID": "string",
        "storeName": "string",
        "business_reg_url": "string",
        "Location": "object",
        "Gopa_ID": "string",
        "date_added": "string",
        "status": "number",
        "stats": {
          "totalOrders": "number",
          "activeBids": "number",
          "completedOrders": "number",
          "totalRevenue": "number"
        }
      }
    ]
  }
  ```
- **Authentication**: Yes

### Sellers Statistics

- **Endpoint**: `GET /api/sellers/stats`
- **Description**: Fetch sellers statistics
- **Response**:
  ```json
  {
    "totalSellers": "number",
    "activeBids": "number",
    "completedOrders": "number",
    "totalRevenue": "number",
    "trends": {
      "totalSellers": "string",
      "activeBids": "string",
      "completedOrders": "string",
      "totalRevenue": "string"
    }
  }
  ```
- **Authentication**: Yes

### Active Bids for Seller

- **Endpoint**: `GET /api/sellers/{sellerId}/active-bids`
- **Description**: Fetch active bids for a specific seller
- **Response**:
  ```json
  {
    "activeBids": [
      {
        "id": "number",
        "bidding_ID": "string",
        "request_ID": "string",
        "assigned_by": "string",
        "Seller_ID": "string",
        "gopa_user_ID": "string",
        "date_assigned": "string",
        "status": "number",
        "price": "number",
        "unitPrice": "number",
        "description": "string",
        "createdAt": "string",
        "date_accepted": "string",
        "seller": "object",
        "images": "array",
        "gopa": "object",
        "assigner": "string",
        "orderRequest": "object"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Bid History for Seller

- **Endpoint**: `GET /api/sellers/{sellerId}/bid-history`
- **Description**: Fetch bid history for a specific seller
- **Response**: Same structure as active bids
- **Authentication**: Yes

### Spare Part Orders

- **Endpoint**: `GET /api/spare-parts/{partId}/orders`
- **Description**: Fetch orders for a specific spare part
- **Response**:
  ```json
  {
    "orders": [
      {
        "id": "number",
        "bidding_ID": "string",
        "request_ID": "string",
        "assigned_by": "string",
        "Seller_ID": "string",
        "gopa_user_ID": "string",
        "date_assigned": "string",
        "status": "number",
        "price": "number",
        "unitPrice": "number",
        "description": "string",
        "createdAt": "string",
        "date_accepted": "string",
        "seller": "object",
        "images": "array",
        "gopa": "object",
        "assigner": "string",
        "orderRequest": "object"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Order Details Statistics

- **Endpoint**: `GET /api/orders/stats`
- **Description**: Fetch order details statistics
- **Response**:
  ```json
  {
    "totalOrders": "number",
    "filteredOrders": "number",
    "trends": {
      "totalOrders": "string",
      "filteredOrders": "string"
    }
  }
  ```
- **Authentication**: Yes

### Order Details with Filters

- **Endpoint**: `GET /api/orders/details`
- **Description**: Fetch order details with filters
- **Query Parameters**:
  - `status` (optional): number
  - `seller` (optional): string
  - `gopa` (optional): string
  - `dateFrom` (optional): string
  - `dateTo` (optional): string
- **Response**: Same structure as spare part orders
- **Authentication**: Yes

---

## User Management

### Users Statistics

- **Endpoint**: `GET /api/users/stats`
- **Description**: Fetch users statistics
- **Response**:
  ```json
  {
    "totalUsers": "number",
    "newUsers": "number",
    "verifiedUsers": "number",
    "adminUsers": "number",
    "trends": {
      "totalUsers": "string",
      "newUsers": "string",
      "verifiedUsers": "string",
      "adminUsers": "string"
    }
  }
  ```
- **Authentication**: Yes

### Buyers Statistics

- **Endpoint**: `GET /api/buyers/stats`
- **Description**: Fetch buyers statistics
- **Response**:
  ```json
  {
    "totalBuyers": "number",
    "activeLocations": "number",
    "assignedGopas": "number",
    "totalProducts": "number",
    "trends": {
      "totalBuyers": "string",
      "activeLocations": "string",
      "assignedGopas": "string",
      "totalProducts": "string"
    }
  }
  ```
- **Authentication**: Yes

### Sellers User Statistics

- **Endpoint**: `GET /api/sellers/user-stats`
- **Description**: Fetch sellers user statistics
- **Response**:
  ```json
  {
    "totalSellers": "number",
    "activeSellers": "number",
    "totalRevenue": "number",
    "trends": {
      "totalSellers": "string",
      "activeSellers": "string",
      "totalRevenue": "string"
    }
  }
  ```
- **Authentication**: Yes

### Riders Statistics

- **Endpoint**: `GET /api/riders/stats`
- **Description**: Fetch riders statistics
- **Response**:
  ```json
  {
    "totalRiders": "number",
    "activeLocations": "number",
    "licenseTypes": "number",
    "serviceAreas": "number",
    "trends": {
      "totalRiders": "string",
      "activeLocations": "string",
      "licenseTypes": "string",
      "serviceAreas": "string"
    }
  }
  ```
- **Authentication**: Yes

### Mechanics Statistics

- **Endpoint**: `GET /api/mechanics/stats`
- **Description**: Fetch mechanics statistics
- **Response**:
  ```json
  {
    "totalMechanics": "number",
    "activeMechanics": "number",
    "totalShops": "number",
    "trends": {
      "totalMechanics": "string",
      "activeMechanics": "string",
      "totalShops": "string"
    }
  }
  ```
- **Authentication**: Yes

### Gopas Statistics

- **Endpoint**: `GET /api/gopas/stats`
- **Description**: Fetch gopas statistics
- **Response**:
  ```json
  {
    "totalGopas": "number",
    "specialties": "number",
    "averageSkills": "number",
    "pendingApprovals": "number",
    "trends": {
      "totalGopas": "string",
      "specialties": "string",
      "averageSkills": "string",
      "pendingApprovals": "string"
    }
  }
  ```
- **Authentication**: Yes

### Vehicles Statistics

- **Endpoint**: `GET /api/vehicles/stats`
- **Description**: Fetch vehicles statistics
- **Response**:
  ```json
  {
    "totalVehicles": "number",
    "activeVehicles": "number",
    "vehicleTypes": "number",
    "trends": {
      "totalVehicles": "string",
      "activeVehicles": "string",
      "vehicleTypes": "string"
    }
  }
  ```
- **Authentication**: Yes

### Payments Statistics

- **Endpoint**: `GET /api/payments/stats`
- **Description**: Fetch payments statistics
- **Response**:
  ```json
  {
    "totalPayments": "number",
    "activeAccounts": "number",
    "totalTransactions": "number",
    "trends": {
      "totalPayments": "string",
      "activeAccounts": "string",
      "totalTransactions": "string"
    }
  }
  ```
- **Authentication**: Yes

---

## Inventory Management

### Manufacturers Statistics

- **Endpoint**: `GET /api/manufacturers/stats`
- **Description**: Fetch manufacturers statistics
- **Response**:
  ```json
  {
    "totalManufacturers": "number",
    "activeManufacturers": "number",
    "totalBrands": "number",
    "trends": {
      "totalManufacturers": "string",
      "activeManufacturers": "string",
      "totalBrands": "string"
    }
  }
  ```
- **Authentication**: Yes

### Brands Statistics

- **Endpoint**: `GET /api/brands/stats`
- **Description**: Fetch brands statistics
- **Response**:
  ```json
  {
    "totalBrands": "number",
    "activeBrands": "number",
    "totalModels": "number",
    "trends": {
      "totalBrands": "string",
      "activeBrands": "string",
      "totalModels": "string"
    }
  }
  ```
- **Authentication**: Yes

### Models Statistics

- **Endpoint**: `GET /api/models/stats`
- **Description**: Fetch models statistics
- **Response**:
  ```json
  {
    "totalModels": "number",
    "activeModels": "number",
    "totalYears": "number",
    "trends": {
      "totalModels": "string",
      "activeModels": "string",
      "totalYears": "string"
    }
  }
  ```
- **Authentication**: Yes

### Inventory Spare Parts Statistics

- **Endpoint**: `GET /api/inventory/spare-parts/stats`
- **Description**: Fetch inventory spare parts statistics
- **Response**:
  ```json
  {
    "totalSpareParts": "number",
    "activeSpareParts": "number",
    "totalCategories": "number",
    "trends": {
      "totalSpareParts": "string",
      "activeSpareParts": "string",
      "totalCategories": "string"
    }
  }
  ```
- **Authentication**: Yes

---

## Access Management

### Applications Statistics

- **Endpoint**: `GET /api/applications/stats`
- **Description**: Fetch applications statistics
- **Response**:
  ```json
  {
    "totalApplications": "number",
    "pendingApplications": "number",
    "approvedApplications": "number",
    "rejectedApplications": "number",
    "trends": {
      "totalApplications": "string",
      "pendingApplications": "string",
      "approvedApplications": "string",
      "rejectedApplications": "string"
    }
  }
  ```
- **Authentication**: Yes

### Groups Statistics

- **Endpoint**: `GET /api/groups/stats`
- **Description**: Fetch groups statistics
- **Response**:
  ```json
  {
    "totalGroups": "number",
    "menuAccess": "number",
    "permissions": "number",
    "menuGroups": "number",
    "trends": {
      "totalGroups": "string",
      "menuAccess": "string",
      "permissions": "string",
      "menuGroups": "string"
    }
  }
  ```
- **Authentication**: Yes

### Menus Statistics

- **Endpoint**: `GET /api/menus/stats`
- **Description**: Fetch menus statistics
- **Response**:
  ```json
  {
    "totalMenus": "number",
    "activeMenus": "number",
    "totalPermissions": "number",
    "trends": {
      "totalMenus": "string",
      "activeMenus": "string",
      "totalPermissions": "string"
    }
  }
  ```
- **Authentication**: Yes

### Permissions Statistics

- **Endpoint**: `GET /api/permissions/stats`
- **Description**: Fetch permissions statistics
- **Response**:
  ```json
  {
    "totalPermissions": "number",
    "activePermissions": "number",
    "totalRoles": "number",
    "trends": {
      "totalPermissions": "string",
      "activePermissions": "string",
      "totalRoles": "string"
    }
  }
  ```
- **Authentication**: Yes

### Roles Statistics

- **Endpoint**: `GET /api/roles/stats`
- **Description**: Fetch roles statistics
- **Response**:
  ```json
  {
    "totalRoles": "number",
    "activeRoles": "number",
    "totalUsers": "number",
    "trends": {
      "totalRoles": "string",
      "activeRoles": "string",
      "totalUsers": "string"
    }
  }
  ```
- **Authentication**: Yes

### Group Details Statistics

- **Endpoint**: `GET /api/groups/{groupId}/stats`
- **Description**: Fetch specific group statistics
- **Response**:
  ```json
  {
    "totalUsers": "number",
    "applications": "number",
    "activeUsers": "number",
    "permissions": "number",
    "trends": {
      "totalUsers": "string",
      "applications": "string",
      "activeUsers": "string",
      "permissions": "string"
    }
  }
  ```
- **Authentication**: Yes

---

## Wallet Management

### Wallets Statistics

- **Endpoint**: `GET /api/wallets/stats`
- **Description**: Fetch wallets statistics
- **Response**:
  ```json
  {
    "totalWallets": "number",
    "totalBalance": "number",
    "revenueWallets": "number",
    "expenseWallets": "number",
    "trends": {
      "totalWallets": "string",
      "totalBalance": "string",
      "revenueWallets": "string",
      "expenseWallets": "string"
    }
  }
  ```
- **Authentication**: Yes

---

## Reference Data

### Available Users

- **Endpoint**: `GET /api/users/available`
- **Description**: Fetch users for dropdown selection
- **Response**:
  ```json
  {
    "users": [
      {
        "value": "string",
        "label": "string",
        "icon": "string (optional)"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Available Gopas

- **Endpoint**: `GET /api/gopas/available`
- **Description**: Fetch gopas for dropdown selection
- **Response**:
  ```json
  {
    "gopas": [
      {
        "value": "string",
        "label": "string",
        "icon": "string (optional)"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Available Applications

- **Endpoint**: `GET /api/applications/available`
- **Description**: Fetch applications for dropdown selection
- **Response**:
  ```json
  {
    "applications": [
      {
        "id": "number",
        "application_id": "string",
        "name": "string",
        "description": "string",
        "dateAdded": "string",
        "added_by": "string",
        "status": "number"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Available Groups

- **Endpoint**: `GET /api/groups/available`
- **Description**: Fetch groups for dropdown selection
- **Response**:
  ```json
  {
    "groups": [
      {
        "id": "number",
        "group_id": "string",
        "title": "string",
        "date_added": "string",
        "added_by": "string",
        "status": "number"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Available Menus

- **Endpoint**: `GET /api/menus/available`
- **Description**: Fetch menus for dropdown selection
- **Response**:
  ```json
  {
    "menus": [
      {
        "id": "number",
        "menuID": "string",
        "title": "string",
        "added_by": "string",
        "application_id": "string",
        "status": "number",
        "date_added": "string"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Gopa Specialties

- **Endpoint**: `GET /api/gopas/specialties`
- **Description**: Fetch gopa specialties for selection
- **Response**:
  ```json
  {
    "specialties": [
      {
        "value": "string",
        "label": "string"
      }
    ]
  }
  ```
- **Authentication**: Yes

### Payment Modes and Providers

- **Endpoint**: `GET /api/payments/modes-providers`
- **Description**: Fetch payment modes and providers
- **Response**:
  ```json
  {
    "paymentModes": ["string"],
    "providers": {
      "WALLET": ["string"],
      "BANK": ["string"],
      "CARD": ["string"]
    }
  }
  ```
- **Authentication**: Yes

### Vehicle Types and Colors

- **Endpoint**: `GET /api/vehicles/types-colors`
- **Description**: Fetch vehicle types and colors
- **Response**:
  ```json
  {
    "vehicleTypes": ["string"],
    "vehicleColors": ["string"]
  }
  ```
- **Authentication**: Yes

### Available Riders

- **Endpoint**: `GET /api/riders/available`
- **Description**: Fetch riders for dropdown selection
- **Response**:
  ```json
  {
    "riders": [
      {
        "value": "string",
        "label": "string",
        "icon": "string (optional)"
      }
    ]
  }
  ```
- **Authentication**: Yes

---

## Search & Filtering

### User Search

- **Endpoint**: `GET /api/users/search`
- **Description**: Search users for wallet management
- **Query Parameters**:
  - `q`: string (search query)
- **Response**:
  ```json
  {
    "users": [
      {
        "id": "string",
        "name": "string"
      }
    ]
  }
  ```
- **Authentication**: Yes

---

## Theme & UI Configuration

### Menu Groups

- **Endpoint**: `GET /api/theme/menu-groups`
- **Description**: Fetch menu groups for UI
- **Response**:
  ```json
  {
    "menuGroups": [
      {
        "id": "string",
        "title": "string",
        "items": [
          {
            "id": "string",
            "name": "string",
            "icon": "string",
            "path": "string",
            "children": "array",
            "count": "number",
            "permissions": "string (optional)"
          }
        ]
      }
    ]
  }
  ```
- **Authentication**: Yes

### Products

- **Endpoint**: `GET /api/theme/products`
- **Description**: Fetch products for UI display
- **Response**:
  ```json
  {
    "products": [
      {
        "id": "number",
        "name": "string",
        "price": "number",
        "category": "string"
      }
    ]
  }
  ```
- **Authentication**: Yes

---

## Implementation Guidelines

### Implementation Priority

#### High Priority (Core Functionality)

1. **Dashboard & Overview endpoints** - Essential for main dashboard functionality
2. **User Management endpoints** - Core user statistics and data
3. **Authentication endpoints** - Required for all protected routes
4. **Order Management endpoints** - Core business functionality

#### Medium Priority (Business Logic)

1. **Inventory Management endpoints** - Product and inventory statistics
2. **Access Management endpoints** - User permissions and roles
3. **Wallet Management endpoints** - Financial data
4. **Reference Data endpoints** - Dropdown and selection data

#### Low Priority (UI Enhancement)

1. **Theme & UI Configuration endpoints** - UI customization
2. **Search & Filtering endpoints** - Enhanced user experience

### Development Standards

#### 1. Consistent Response Format

All endpoints must follow the standard response format with success/error indicators.

#### 2. Error Handling

- Implement proper HTTP status codes (200, 400, 401, 403, 404, 500)
- Provide meaningful error messages
- Include error codes for frontend handling

#### 3. Data Validation

- Validate all input data using appropriate validation rules
- Return validation errors with specific field information
- Sanitize data to prevent injection attacks

#### 4. Authentication & Authorization

- Implement JWT token-based authentication
- Validate tokens on protected endpoints
- Check user permissions for sensitive operations

#### 5. Performance Optimization

- Implement database query optimization
- Add caching for frequently accessed data
- Use pagination for large datasets
- Implement rate limiting for API endpoints

#### 6. Security Measures

- Use HTTPS for all endpoints
- Implement CORS policies
- Validate and sanitize all inputs
- Log security-related events

#### 7. Monitoring & Logging

- Add comprehensive logging for all endpoints
- Monitor API performance and errors
- Track usage patterns and metrics

#### 8. Testing Requirements

- Unit tests for all endpoints
- Integration tests for data flow
- Performance tests for critical endpoints
- Security tests for authentication and authorization

### Pagination Support

For endpoints that return lists, implement pagination with these query parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `sortBy`: Field to sort by
- `sortOrder`: Sort order (asc/desc)

### Filtering Support

Many endpoints support filtering via query parameters. Common filter patterns:

- Date ranges: `dateFrom`, `dateTo`
- Status filters: `status`
- Search queries: `q`
- Category filters: `category`

### Database Considerations

- Use appropriate indexes for frequently queried fields
- Implement soft deletes where applicable
- Use transactions for multi-step operations
- Consider read replicas for high-traffic endpoints

### API Versioning

- Use URL versioning: `/api/v1/endpoint`
- Maintain backward compatibility when possible
- Document breaking changes clearly

This documentation provides a comprehensive guide for implementing all the required API endpoints to replace the hardcoded data in the Spepas application. The backend engineer should use this as a reference for building a robust, scalable API that meets all the application's data requirements.
