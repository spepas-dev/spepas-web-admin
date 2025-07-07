/**
 * PageHeader Component Examples
 *
 * This file demonstrates various usage patterns for the PageHeader component.
 * Use these examples as reference for implementing page headers in your application.
 */

import { BarChart, Download, Filter, Plus, Search, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { PageHeader, PageHeaderPatterns } from './pageHeader';

// Example 1: Basic Usage
export function BasicPageHeaderExample() {
  return <PageHeader title="Dashboard" description="Welcome back! Here's what's happening with your account." />;
}

// Example 2: With Single Action
export function SingleActionExample() {
  return (
    <PageHeader
      title="Users"
      description="Manage users and their permissions"
      actions={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      }
    />
  );
}

// Example 3: With Multiple Actions
export function MultipleActionsExample() {
  return (
    <PageHeader
      title="Products"
      description="Manage your product catalog"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      }
    />
  );
}

// Example 4: Different Sizes
export function SizeVariantsExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <PageHeader title="Settings" description="Configure your preferences" size="sm" actions={<Button size="sm">Save</Button>} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size</h3>
        <PageHeader title="Reports" description="View and generate reports" size="md" actions={<Button>Generate</Button>} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size (Default)</h3>
        <PageHeader title="Analytics" description="Track your performance metrics" size="lg" actions={<Button>View Details</Button>} />
      </div>
    </div>
  );
}

// Example 5: Layout Variants
export function LayoutVariantsExample() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Layout</h3>
        <PageHeader
          title="Team Management"
          description="Organize and manage your team members"
          layout="default"
          actions={<Button>Add Member</Button>}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Centered Layout</h3>
        <PageHeader
          title="Welcome to Our Platform"
          description="Start building amazing applications today"
          layout="centered"
          actions={<Button size="lg">Get Started</Button>}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Split Layout</h3>
        <PageHeader
          title="Project Overview"
          description="Track progress and manage resources"
          layout="split"
          actions={
            <div className="flex gap-2">
              <Button variant="outline">Export</Button>
              <Button>New Project</Button>
            </div>
          }
        />
      </div>
    </div>
  );
}

// Example 6: Using Pre-built Patterns
export function PatternsExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Standard Pattern</h3>
        <PageHeader
          {...PageHeaderPatterns.standard('Inventory Management', 'Track and manage your inventory', <Button>Add Item</Button>)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Hero Pattern</h3>
        <PageHeader
          {...PageHeaderPatterns.hero(
            'Transform Your Business',
            'Powerful tools for modern teams',
            <Button size="lg">Start Free Trial</Button>
          )}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Minimal Pattern</h3>
        <PageHeader {...PageHeaderPatterns.minimal('Account Settings')} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Settings Pattern</h3>
        <PageHeader
          {...PageHeaderPatterns.settings('Security Settings', 'Manage your account security preferences', <Button>Save Changes</Button>)}
        />
      </div>
    </div>
  );
}

// Example 7: With Children Content
export function WithChildrenExample() {
  return (
    <PageHeader
      title="Sales Dashboard"
      description="Monitor your sales performance and key metrics"
      actions={
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold">$12,345</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold">1,234</div>
          <div className="text-sm text-gray-600">Orders</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold">567</div>
          <div className="text-sm text-gray-600">Customers</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-2xl font-bold">4.2%</div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
        </div>
      </div>
    </PageHeader>
  );
}

// Example 8: With Custom Styling
export function CustomStyledExample() {
  return (
    <PageHeader
      title="Premium Dashboard"
      description="Exclusive features for premium users"
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl"
      titleClassName="text-4xl font-extrabold"
      descriptionClassName="text-lg opacity-90"
      actions={
        <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
          Upgrade Plan
        </Button>
      }
    />
  );
}

// Example 9: Search and Filter Header
export function SearchFilterExample() {
  return (
    <PageHeader
      title="Content Library"
      description="Browse and manage your content assets"
      actions={
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search content..." className="pl-10 w-64" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </div>
      }
    />
  );
}

// Example 10: Analytics Page Header
export function AnalyticsExample() {
  return (
    <PageHeader
      title="Website Analytics"
      description="Track your website performance and user engagement"
      actions={
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <BarChart className="w-4 h-4 mr-2" />
            View Report
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      }
    />
  );
}

// Example 11: E-commerce Admin
export function EcommerceAdminExample() {
  return (
    <PageHeader
      title="Order Management"
      description="Process and track customer orders"
      actions={
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter Orders
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Manual Order
          </Button>
        </div>
      }
    />
  );
}

// Example 12: Settings Page
export function SettingsPageExample() {
  return (
    <PageHeader
      title="Account Settings"
      description="Manage your account preferences and configuration"
      layout="default"
      showDivider={true}
      actions={
        <div className="flex gap-2">
          <Button variant="outline">Reset</Button>
          <Button>Save Changes</Button>
        </div>
      }
    />
  );
}

// Comprehensive Demo Component
export function PageHeaderDemo() {
  return (
    <div className="p-8 space-y-16">
      <div>
        <h1 className="text-3xl font-bold mb-8">PageHeader Component Examples</h1>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">1. Basic Usage</h2>
            <BasicPageHeaderExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">2. Single Action</h2>
            <SingleActionExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">3. Multiple Actions</h2>
            <MultipleActionsExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">4. Size Variants</h2>
            <SizeVariantsExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">5. Layout Variants</h2>
            <LayoutVariantsExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">6. Pre-built Patterns</h2>
            <PatternsExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">7. With Children Content</h2>
            <WithChildrenExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">8. Custom Styling</h2>
            <CustomStyledExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">9. Search & Filter</h2>
            <SearchFilterExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">10. Analytics Dashboard</h2>
            <AnalyticsExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">11. E-commerce Admin</h2>
            <EcommerceAdminExample />
          </section>

          <section>
            <h2 className="text-2xl font-semibent mb-6">12. Settings Page</h2>
            <SettingsPageExample />
          </section>
        </div>
      </div>
    </div>
  );
}

export default PageHeaderDemo;
