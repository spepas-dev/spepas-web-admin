import { ChevronRight, Home } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  /** The text to display for this breadcrumb item */
  label: string;
  /** The path to navigate to. If not provided, item will be rendered as non-clickable */
  href?: string;
  /** Optional icon to display before the label */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether this item is the current page (will be styled differently) */
  isCurrentPage?: boolean;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom separator between items. Defaults to ChevronRight */
  separator?: React.ReactNode;
  /** Show home icon on first item */
  showHomeIcon?: boolean;
  /** Custom className for the breadcrumb container */
  className?: string;
  /** Custom className for individual items */
  itemClassName?: string;
  /** Custom className for the separator */
  separatorClassName?: string;
  /** Custom className for the current page item */
  currentPageClassName?: string;
  /** Maximum number of items to show before truncating */
  maxItems?: number;
  /** Aria label for the breadcrumb navigation */
  ariaLabel?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRight className="w-4 h-4" />,
  showHomeIcon = false,
  className,
  itemClassName,
  separatorClassName,
  currentPageClassName,
  maxItems,
  ariaLabel = 'Breadcrumb navigation'
}) => {
  // Handle truncation if maxItems is specified
  const processedItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) {
      return items;
    }

    // Keep first item, last item, and truncate middle
    const firstItem = items[0];
    const lastItems = items.slice(-Math.max(1, maxItems - 2));

    return [
      firstItem,
      {
        label: '...',
        isCurrentPage: false,
        href: undefined
      },
      ...lastItems
    ];
  }, [items, maxItems]);

  if (!items.length) {
    return null;
  }

  return (
    <nav className={cn('flex items-center text-sm text-muted-foreground', className)} aria-label={ariaLabel}>
      <ol className="flex items-center space-x-1">
        {processedItems.map((item, index) => {
          const isLast = index === processedItems.length - 1;
          const isCurrentPage = item.isCurrentPage ?? isLast;
          const Icon = item.icon;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {/* Breadcrumb Item */}
              <div className="flex items-center">
                {/* Home icon for first item if enabled */}
                {index === 0 && showHomeIcon && !Icon && <Home className="w-4 h-4 mr-1" />}

                {/* Custom icon */}
                {Icon && <Icon className="w-4 h-4 mr-1" />}

                {/* Breadcrumb text/link */}
                {item.href && !isCurrentPage ? (
                  <Link
                    to={item.href}
                    className={cn(
                      'hover:text-[#4A36EC] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#4A36EC] focus:ring-offset-2 rounded-sm',
                      itemClassName
                    )}
                    aria-current={isCurrentPage ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      isCurrentPage && 'text-[#4A36EC] font-medium',
                      item.label === '...' && 'text-muted-foreground cursor-default',
                      currentPageClassName,
                      itemClassName
                    )}
                    aria-current={isCurrentPage ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </div>

              {/* Separator */}
              {!isLast && (
                <div className={cn('mx-2 text-muted-foreground', separatorClassName)} aria-hidden="true">
                  {separator}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Convenience hook for creating breadcrumb items
export const useBreadcrumb = () => {
  const createItem = (label: string, href?: string, options?: Partial<Omit<BreadcrumbItem, 'label' | 'href'>>): BreadcrumbItem => ({
    label,
    href,
    ...options
  });

  const createCurrentPage = (label: string): BreadcrumbItem => ({
    label,
    isCurrentPage: true
  });

  return {
    createItem,
    createCurrentPage
  };
};

// Pre-built breadcrumb patterns
export const BreadcrumbPatterns = {
  // Dashboard -> Section -> Page
  threeTier: (section: string, sectionHref: string, page: string): BreadcrumbItem[] => [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: section, href: sectionHref },
    { label: page, isCurrentPage: true }
  ],

  // Dashboard -> Section -> Subsection -> Page
  fourTier: (section: string, sectionHref: string, subsection: string, subsectionHref: string, page: string): BreadcrumbItem[] => [
    { label: 'Dashboard', href: '/', icon: Home },
    { label: section, href: sectionHref },
    { label: subsection, href: subsectionHref },
    { label: page, isCurrentPage: true }
  ]
};

export default Breadcrumb;
