# Breadcrumb Component

A highly customizable and accessible breadcrumb navigation component for React applications.

## Features

- 🎨 **Fully Customizable**: Custom styling, separators, icons, and layouts
- ♿ **Accessibility First**: Proper ARIA labels, semantic HTML, and keyboard navigation
- 🔗 **React Router Integration**: Uses `Link` component for client-side navigation
- 📱 **Responsive**: Supports truncation for long breadcrumb trails
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- 🏗️ **Flexible API**: Multiple usage patterns and pre-built configurations

## Basic Usage

```tsx
import { Breadcrumb } from '@/components/ui/custom';

// Simple breadcrumb
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Category', href: '/products/category' },
    { label: 'Current Page', isCurrentPage: true }
  ]}
/>;
```

## Pre-built Patterns

### Three-Tier Pattern

```tsx
import { BreadcrumbPatterns } from '@/components/ui/custom';

<Breadcrumb items={BreadcrumbPatterns.threeTier('Inventory', '/inventory', 'Manufacturers')} />;
// Result: Dashboard → Inventory → Manufacturers
```

### Four-Tier Pattern

```tsx
<Breadcrumb items={BreadcrumbPatterns.fourTier('User Management', '/users', 'Roles', '/users/roles', 'Permissions')} />
// Result: Dashboard → User Management → Roles → Permissions
```

## Advanced Usage

### With Custom Icons

```tsx
import { User, Shield, Key } from 'lucide-react';

<Breadcrumb
  items={[
    { label: 'Dashboard', href: '/', icon: Home },
    { label: 'Users', href: '/users', icon: User },
    { label: 'Role Management', href: '/users/roles', icon: Shield },
    { label: 'Permissions', isCurrentPage: true, icon: Key }
  ]}
/>;
```

### With Custom Separator

```tsx
<Breadcrumb items={breadcrumbItems} separator={<span className="mx-2">/</span>} />
```

### With Truncation

```tsx
<Breadcrumb items={longBreadcrumbItems} maxItems={4} />
// Result: First → ... → Second Last → Last
```

### With Custom Styling

```tsx
<Breadcrumb
  items={breadcrumbItems}
  className="bg-gray-50 p-4 rounded-lg"
  itemClassName="font-semibold"
  separatorClassName="text-blue-500"
  currentPageClassName="text-purple-600"
/>
```

## Hook for Dynamic Breadcrumbs

```tsx
import { useBreadcrumb } from '@/components/ui/custom';

function MyComponent() {
  const { createItem, createCurrentPage } = useBreadcrumb();

  const breadcrumbItems = [
    createItem('Dashboard', '/'),
    createItem('Users', '/users'),
    createItem('Profile', '/users/profile'),
    createCurrentPage('Settings')
  ];

  return <Breadcrumb items={breadcrumbItems} />;
}
```

## API Reference

### BreadcrumbProps

| Prop                   | Type               | Default                   | Description                       |
| ---------------------- | ------------------ | ------------------------- | --------------------------------- |
| `items`                | `BreadcrumbItem[]` | **Required**              | Array of breadcrumb items         |
| `separator`            | `React.ReactNode`  | `<ChevronRight />`        | Custom separator component        |
| `showHomeIcon`         | `boolean`          | `false`                   | Show home icon on first item      |
| `className`            | `string`           | `undefined`               | Custom CSS class for container    |
| `itemClassName`        | `string`           | `undefined`               | Custom CSS class for items        |
| `separatorClassName`   | `string`           | `undefined`               | Custom CSS class for separators   |
| `currentPageClassName` | `string`           | `undefined`               | Custom CSS class for current page |
| `maxItems`             | `number`           | `undefined`               | Maximum items before truncation   |
| `ariaLabel`            | `string`           | `'Breadcrumb navigation'` | ARIA label for navigation         |

### BreadcrumbItem

| Property        | Type                   | Description                      |
| --------------- | ---------------------- | -------------------------------- |
| `label`         | `string`               | Text to display                  |
| `href`          | `string?`              | Navigation path (optional)       |
| `icon`          | `React.ComponentType?` | Icon component (optional)        |
| `isCurrentPage` | `boolean?`             | Whether this is the current page |

## Best Practices

### 1. Accessibility

- Always provide meaningful labels
- Use `isCurrentPage` for the current page item
- Don't make the current page clickable

### 2. Navigation

- Use React Router `Link` for client-side navigation
- Provide `href` for all navigable items
- Consider deep linking and URL structure

### 3. Performance

- Use `maxItems` for very long breadcrumb trails
- Consider memoization for complex breadcrumb calculations

### 4. UX Guidelines

- Keep breadcrumb labels concise
- Maintain consistent styling across pages
- Use logical hierarchy that matches your app structure

## Examples by Use Case

### E-commerce

```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Electronics', href: '/electronics' },
    { label: 'Phones', href: '/electronics/phones' },
    { label: 'iPhone 15 Pro', isCurrentPage: true }
  ]}
/>
```

### Dashboard Navigation

```tsx
<Breadcrumb
  items={[
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
    { label: 'Reports', isCurrentPage: true, icon: FileText }
  ]}
/>
```

### File System

```tsx
<Breadcrumb
  items={[
    { label: 'Root', href: '/' },
    { label: 'Documents', href: '/documents' },
    { label: 'Projects', href: '/documents/projects' },
    { label: 'React App', isCurrentPage: true }
  ]}
  separator={<span className="mx-1 text-gray-400">/</span>}
/>
```

## Styling Notes

The component uses Tailwind CSS classes and follows the design system:

- Primary color: `#4A36EC`
- Hover states with smooth transitions
- Focus states with ring outlines
- Responsive design with proper spacing
- Semantic HTML structure (`nav`, `ol`, `li`)

## Migration from Legacy Breadcrumbs

Replace old breadcrumb code:

```tsx
// Old way ❌
<div className="flex items-center text-sm text-muted-foreground">
  <a href="/" className="hover:text-[#4A36EC]">Dashboard</a>
  <ChevronRight className="w-4 h-4 mx-2" />
  <a href="/inventory" className="hover:text-[#4A36EC]">Inventory</a>
  <ChevronRight className="w-4 h-4 mx-2" />
  <span className="text-[#4A36EC] font-medium">Manufacturers</span>
</div>

// New way ✅
<Breadcrumb
  items={BreadcrumbPatterns.threeTier('Inventory', '/inventory', 'Manufacturers')}
/>
```
