/**
 * Breadcrumb Component Examples
 *
 * This file demonstrates various usage patterns for the Breadcrumb component.
 * Use these examples as reference for implementing breadcrumbs in your pages.
 */

import { BarChart, Car, FileText, Home, Package, Settings, Shield, ShoppingCart, Users } from 'lucide-react';

import { Breadcrumb, BreadcrumbPatterns, useBreadcrumb } from './breadcrumb';

// Example 1: Basic Usage
export function BasicBreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Smartphones', isCurrentPage: true }
      ]}
    />
  );
}

// Example 2: With Icons
export function IconBreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Dashboard', href: '/', icon: Home },
        { label: 'E-commerce', href: '/ecommerce', icon: ShoppingCart },
        { label: 'Products', href: '/ecommerce/products', icon: Package },
        { label: 'Product Details', isCurrentPage: true, icon: FileText }
      ]}
    />
  );
}

// Example 3: Using Pre-built Patterns
export function PatternBreadcrumbExample() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Three-Tier Pattern</h4>
        <Breadcrumb items={BreadcrumbPatterns.threeTier('User Management', '/users', 'Profile Settings')} />
      </div>

      <div>
        <h4 className="font-semibold mb-2">Four-Tier Pattern</h4>
        <Breadcrumb items={BreadcrumbPatterns.fourTier('Inventory', '/inventory', 'Vehicles', '/inventory/vehicles', 'Manufacturers')} />
      </div>
    </div>
  );
}

// Example 4: Custom Styling
export function CustomStyledBreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Analytics', href: '/analytics' },
        { label: 'Reports', isCurrentPage: true }
      ]}
      className="bg-gray-50 p-3 rounded-lg border"
      itemClassName="font-medium"
      separatorClassName="text-blue-500"
      currentPageClassName="text-purple-600 bg-purple-50 px-2 py-1 rounded"
    />
  );
}

// Example 5: Custom Separator
export function CustomSeparatorExample() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Slash Separator</h4>
        <Breadcrumb
          items={[
            { label: 'Root', href: '/' },
            { label: 'Documents', href: '/documents' },
            { label: 'Projects', href: '/documents/projects' },
            { label: 'React App', isCurrentPage: true }
          ]}
          separator={<span className="mx-1 text-gray-400">/</span>}
        />
      </div>

      <div>
        <h4 className="font-semibold mb-2">Dot Separator</h4>
        <Breadcrumb
          items={[
            { label: 'Settings', href: '/settings' },
            { label: 'Account', href: '/settings/account' },
            { label: 'Privacy', isCurrentPage: true }
          ]}
          separator={<span className="mx-2 text-gray-400">•</span>}
        />
      </div>
    </div>
  );
}

// Example 6: With Truncation
export function TruncatedBreadcrumbExample() {
  const longBreadcrumbItems = [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'System', href: '/system', icon: Settings },
    { label: 'User Management', href: '/system/users', icon: Users },
    { label: 'Roles', href: '/system/users/roles', icon: Shield },
    { label: 'Permissions', href: '/system/users/roles/permissions' },
    { label: 'Access Control', href: '/system/users/roles/permissions/access' },
    { label: 'Resource Management', isCurrentPage: true }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Full Breadcrumb (7 items)</h4>
        <Breadcrumb items={longBreadcrumbItems} />
      </div>

      <div>
        <h4 className="font-semibold mb-2">Truncated (max 4 items)</h4>
        <Breadcrumb items={longBreadcrumbItems} maxItems={4} />
      </div>
    </div>
  );
}

// Example 7: Using the Hook
export function HookBreadcrumbExample() {
  const { createItem, createCurrentPage } = useBreadcrumb();

  const breadcrumbItems = [
    createItem('Dashboard', '/', { icon: Home }),
    createItem('Analytics', '/analytics', { icon: BarChart }),
    createItem('Vehicle Reports', '/analytics/vehicles', { icon: Car }),
    createCurrentPage('Monthly Summary')
  ];

  return <Breadcrumb items={breadcrumbItems} />;
}

// Example 8: Real-world E-commerce Example
export function EcommerceBreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Electronics', href: '/category/electronics' },
        { label: 'Smartphones', href: '/category/electronics/smartphones' },
        { label: 'Apple', href: '/category/electronics/smartphones/apple' },
        { label: 'iPhone 15 Pro Max 256GB Natural Titanium', isCurrentPage: true }
      ]}
      maxItems={4}
    />
  );
}

// Example 9: Dashboard Navigation Example
export function DashboardBreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Dashboard', href: '/dashboard', icon: Home },
        { label: 'User Management', href: '/dashboard/users', icon: Users },
        { label: 'Role Management', href: '/dashboard/users/roles', icon: Shield },
        { label: 'Create New Role', isCurrentPage: true, icon: Settings }
      ]}
      showHomeIcon={true}
    />
  );
}

// Example 10: File System Example
export function FileSystemBreadcrumbExample() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/files' },
        { label: 'Documents', href: '/files/documents' },
        { label: 'Work', href: '/files/documents/work' },
        { label: 'Projects', href: '/files/documents/work/projects' },
        { label: 'spepas-app', isCurrentPage: true }
      ]}
      separator={<span className="mx-1 text-gray-400 font-mono">/</span>}
      className="font-mono text-sm bg-gray-100 p-2 rounded"
    />
  );
}

// Comprehensive Demo Component
export function BreadcrumbDemo() {
  return (
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-8">Breadcrumb Component Examples</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Basic Usage</h2>
            <BasicBreadcrumbExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. With Icons</h2>
            <IconBreadcrumbExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Pre-built Patterns</h2>
            <PatternBreadcrumbExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Custom Styling</h2>
            <CustomStyledBreadcrumbExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Custom Separators</h2>
            <CustomSeparatorExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Truncation</h2>
            <TruncatedBreadcrumbExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Using Hook</h2>
            <HookBreadcrumbExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. E-commerce Example</h2>
            <EcommerceBreadcrumbExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Dashboard Navigation</h2>
            <DashboardBreadcrumbExample />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">10. File System</h2>
            <FileSystemBreadcrumbExample />
          </section>
        </div>
      </div>
    </div>
  );
}

export default BreadcrumbDemo;
