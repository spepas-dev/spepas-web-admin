# PageHeader Component

A flexible and customizable page header component for React applications, designed to provide consistent page titles, descriptions, and actions across your application.

## Features

- 🎨 **Highly Customizable**: Multiple size variants, layouts, and styling options
- 🏗️ **Flexible Layout**: Support for different header layouts (default, centered, split)
- 🎬 **Built-in Animations**: Smooth entry animations with Framer Motion
- 📱 **Responsive Design**: Works seamlessly across all device sizes
- 🎯 **TypeScript Support**: Full type safety and IntelliSense
- ♿ **Accessibility**: Proper semantic HTML structure and ARIA support
- 🎨 **Design System Integration**: Consistent with your app's design language

## Basic Usage

```tsx
import { PageHeader } from '@/components/ui/custom';

// Simple header with title and description
<PageHeader
  title="Manufacturers"
  description="Manage car manufacturers in the system"
/>

// With action buttons
<PageHeader
  title="User Management"
  description="Manage users and their permissions"
  actions={
    <Button onClick={handleAddUser}>
      <Plus className="w-4 h-4 mr-2" />
      Add User
    </Button>
  }
/>
```

## Props API

### PageHeaderProps

| Prop                   | Type                                           | Default      | Description                                         |
| ---------------------- | ---------------------------------------------- | ------------ | --------------------------------------------------- |
| `title`                | `string`                                       | **Required** | The main title of the page                          |
| `description`          | `string?`                                      | `undefined`  | Optional description text below the title           |
| `actions`              | `React.ReactNode?`                             | `undefined`  | Optional content for the right side (buttons, etc.) |
| `children`             | `React.ReactNode?`                             | `undefined`  | Optional content below the header                   |
| `className`            | `string?`                                      | `undefined`  | Custom CSS class for container                      |
| `titleClassName`       | `string?`                                      | `undefined`  | Custom CSS class for title                          |
| `descriptionClassName` | `string?`                                      | `undefined`  | Custom CSS class for description                    |
| `actionsClassName`     | `string?`                                      | `undefined`  | Custom CSS class for actions                        |
| `animate`              | `boolean`                                      | `true`       | Whether to animate the header on mount              |
| `size`                 | `'sm' \| 'md' \| 'lg'`                         | `'lg'`       | Size variant for the header                         |
| `layout`               | `'default' \| 'centered' \| 'split'`           | `'default'`  | Layout variant                                      |
| `showDivider`          | `boolean`                                      | `false`      | Whether to show a divider below                     |
| `divider`              | `React.ReactNode?`                             | `<hr />`     | Custom divider component                            |
| `titleTag`             | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'`       | HTML tag for the title                              |

## Size Variants

### Small (`sm`)

```tsx
<PageHeader title="Settings" description="Configure your preferences" size="sm" />
```

### Medium (`md`)

```tsx
<PageHeader title="Dashboard" description="Overview of your account" size="md" />
```

### Large (`lg`) - Default

```tsx
<PageHeader title="Analytics" description="View your performance metrics" size="lg" />
```

## Layout Variants

### Default Layout

Standard left-aligned header with actions on the right.

```tsx
<PageHeader title="Products" description="Manage your product catalog" layout="default" actions={<Button>Add Product</Button>} />
```

### Centered Layout

Center-aligned header, ideal for hero sections or landing pages.

```tsx
<PageHeader
  title="Welcome to Dashboard"
  description="Get started with your account"
  layout="centered"
  actions={<Button>Get Started</Button>}
/>
```

### Split Layout

Responsive layout that stacks on mobile, side-by-side on desktop.

```tsx
<PageHeader
  title="Reports"
  description="View and export your data"
  layout="split"
  actions={
    <div className="flex gap-2">
      <Button variant="outline">Export</Button>
      <Button>Generate Report</Button>
    </div>
  }
/>
```

## Pre-built Patterns

### Standard Pattern

```tsx
import { PageHeaderPatterns } from '@/components/ui/custom';

<PageHeader {...PageHeaderPatterns.standard('User Management', 'Manage users and their permissions', <Button>Add User</Button>)} />;
```

### Hero Pattern

```tsx
<PageHeader
  {...PageHeaderPatterns.hero(
    'Welcome to Our Platform',
    'Start building amazing applications today',
    <Button size="lg">Get Started</Button>
  )}
/>
```

### Minimal Pattern

```tsx
<PageHeader {...PageHeaderPatterns.minimal('Settings')} />
```

### Dashboard Pattern

```tsx
<PageHeader {...PageHeaderPatterns.dashboard('Analytics', 'View your performance metrics', <StatsGrid />)} />
```

### Settings Pattern

```tsx
<PageHeader {...PageHeaderPatterns.settings('Account Settings', 'Manage your account preferences', <Button>Save Changes</Button>)} />
```

## Advanced Usage

### With Custom Styling

```tsx
<PageHeader
  title="Custom Header"
  description="This header has custom styling"
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg"
  titleClassName="text-4xl font-extrabold"
  descriptionClassName="text-lg opacity-90"
  actions={<Button variant="secondary">Action</Button>}
/>
```

### With Children Content

```tsx
<PageHeader title="Dashboard" description="Overview of your account" actions={<Button>Settings</Button>}>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <StatsCard title="Users" value="1,234" />
    <StatsCard title="Orders" value="5,678" />
    <StatsCard title="Revenue" value="$12,345" />
  </div>
</PageHeader>
```

### With Custom Divider

```tsx
<PageHeader
  title="Reports"
  description="View and export your data"
  showDivider={true}
  divider={<div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />}
/>
```

### With Breadcrumb Integration

```tsx
import { PageHeaderWithBreadcrumb, Breadcrumb, BreadcrumbPatterns } from '@/components/ui/custom';

<PageHeaderWithBreadcrumb
  breadcrumb={<Breadcrumb items={BreadcrumbPatterns.threeTier('Inventory', '/inventory', 'Manufacturers')} />}
  title="Manufacturers"
  description="Manage car manufacturers in the system"
  actions={<Button>Add Manufacturer</Button>}
/>;
```

## Using the Hook

The `usePageHeader` hook provides utilities for creating header props dynamically:

```tsx
import { usePageHeader } from '@/components/ui/custom';

function MyComponent() {
  const { createHeader, createStandardHeader } = usePageHeader();

  const headerProps = createStandardHeader('Dynamic Title', 'This title was created dynamically', <Button>Dynamic Action</Button>);

  return <PageHeader {...headerProps} />;
}
```

## Real-World Examples

### E-commerce Product Page

```tsx
<PageHeader
  title="Product Management"
  description="Add, edit, and organize your products"
  actions={
    <div className="flex gap-2">
      <Button variant="outline">Import</Button>
      <Button variant="outline">Export</Button>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Add Product
      </Button>
    </div>
  }
/>
```

### User Profile Page

```tsx
<PageHeader
  title="Profile Settings"
  description="Manage your personal information and preferences"
  layout="centered"
  actions={<Button>Save Changes</Button>}
/>
```

### Analytics Dashboard

```tsx
<PageHeader
  title="Analytics Dashboard"
  description="Track your key performance indicators"
  actions={
    <div className="flex gap-2">
      <Select>
        <SelectTrigger>
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
    <MetricCard title="Total Users" value="12,345" change="+12%" />
    <MetricCard title="Revenue" value="$45,678" change="+8%" />
    <MetricCard title="Orders" value="1,234" change="+15%" />
    <MetricCard title="Conversion" value="3.2%" change="+2%" />
  </div>
</PageHeader>
```

## Best Practices

### 1. Title Guidelines

- Keep titles concise and descriptive
- Use sentence case for better readability
- Avoid abbreviations when possible

### 2. Description Guidelines

- Provide context about what the user can do on the page
- Keep descriptions under 100 characters
- Use active voice

### 3. Actions Guidelines

- Place the most important action on the right
- Use consistent button styling across your app
- Group related actions together

### 4. Accessibility

- Use proper heading hierarchy (`titleTag` prop)
- Ensure sufficient color contrast
- Provide meaningful button labels

### 5. Performance

- Use `animate={false}` for frequently updated pages
- Memoize action components when possible
- Consider using the minimal pattern for simple pages

## Migration Guide

### From Custom Headers

**Before:**

```tsx
<div className="flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold text-[#4A36EC]">Title</h1>
    <p className="text-sm text-gray-600">Description</p>
  </div>
  <Button>Action</Button>
</div>
```

**After:**

```tsx
<PageHeader title="Title" description="Description" actions={<Button>Action</Button>} />
```

### From motion.div Headers

**Before:**

```tsx
<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
  <h1>Title</h1>
  <p>Description</p>
</motion.div>
```

**After:**

```tsx
<PageHeader title="Title" description="Description" animate={true} />
```

## Styling Notes

The component follows your design system:

- Primary color: `#4A36EC`
- Gray text: `text-gray-600`
- Responsive design with proper spacing
- Consistent typography scale
- Smooth animations with Framer Motion

## Integration with Other Components

The PageHeader works seamlessly with:

- **Breadcrumb**: Use `PageHeaderWithBreadcrumb`
- **DataTable**: Place above tables for context
- **CardGrid**: Use as children for dashboard layouts
- **Form components**: Great for settings pages

This component is designed to be the foundation of consistent page layouts across your application!
