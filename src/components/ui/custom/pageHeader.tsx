import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';

import { Button } from '../button';

export interface PageHeaderProps {
  /** The main title of the page */
  title: React.ReactNode;
  /** Optional description text below the title */
  description?: string;
  /** Optional content to display on the right side (buttons, actions, etc.) */
  actions?: React.ReactNode;
  /** Optional children to display below the title/description */
  children?: React.ReactNode;
  /** Custom className for the header container */
  className?: string;
  /** Custom className for the title */
  titleClassName?: string;
  /** Custom className for the description */
  descriptionClassName?: string;
  /** Custom className for the actions container */
  actionsClassName?: string;
  /** Whether to animate the header on mount */
  animate?: boolean;
  /** Size variant for the header */
  size?: 'sm' | 'md' | 'lg';
  /** Layout variant */
  layout?: 'default' | 'centered' | 'split';
  /** Whether to show a divider below the header */
  showDivider?: boolean;
  /** Custom divider component */
  divider?: React.ReactNode;
  /** Semantic HTML tag to use for the title */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// Size variants
const sizeVariants = {
  sm: {
    title: 'text-xl font-semibold',
    description: 'text-xs',
    spacing: 'space-y-1'
  },
  md: {
    title: 'text-2xl font-bold',
    description: 'text-sm',
    spacing: 'space-y-2'
  },
  lg: {
    title: 'text-3xl font-bold',
    description: 'text-base',
    spacing: 'space-y-3'
  }
};

// Layout variants
const layoutVariants = {
  default: 'flex items-center justify-between',
  centered: 'flex flex-col items-center text-center',
  split: 'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'
};

// Default animation variants
const defaultAnimationVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' }
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  children,
  className,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  animate = true,
  size = 'lg',
  layout = 'default',
  showDivider = false,
  divider,
  titleTag: TitleTag = 'h1'
}) => {
  const sizeConfig = sizeVariants[size];
  const layoutConfig = layoutVariants[layout];
  const navigate = useNavigate();

  const HeaderContent = () => (
    <>
      <div className={cn(layoutConfig, className)}>
        {/* Title and Description Section */}
        <div className={cn(sizeConfig.spacing, layout === 'centered' ? 'items-center' : '')}>
          <div className="flex items-center gap-2">
            <Button size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <TitleTag className={cn(sizeConfig.title, 'text-[#4A36EC]', titleClassName)}>{title}</TitleTag>
          </div>

          {description && <p className={cn(sizeConfig.description, 'text-gray-600 mr-4', descriptionClassName)}>{description}</p>}
        </div>

        {/* Actions Section */}
        {actions && <div className={cn('flex items-center gap-2', layout === 'centered' && 'mt-4', actionsClassName)}>{actions}</div>}
      </div>

      {/* Children Section */}
      {children && <div className="mt-6">{children}</div>}

      {/* Divider */}
      {showDivider && <div className="mt-6">{divider || <hr className="border-gray-200" />}</div>}
    </>
  );

  if (animate) {
    return (
      <motion.div
        initial={defaultAnimationVariants.initial}
        animate={defaultAnimationVariants.animate}
        transition={defaultAnimationVariants.transition}
      >
        <HeaderContent />
      </motion.div>
    );
  }

  return <HeaderContent />;
};

// Convenience wrapper for pages with breadcrumbs
export const PageHeaderWithBreadcrumb: React.FC<
  PageHeaderProps & {
    breadcrumb: React.ReactNode;
  }
> = ({ breadcrumb, ...props }) => {
  return (
    <div className="space-y-6">
      {breadcrumb}
      <PageHeader {...props} />
    </div>
  );
};

// Pre-built header patterns
export const PageHeaderPatterns = {
  // Standard page with title, description, and action button
  standard: (title: string, description: string, actionButton: React.ReactNode): PageHeaderProps => ({
    title,
    description,
    actions: actionButton,
    size: 'lg',
    layout: 'default'
  }),

  // Centered hero-style header
  hero: (title: string, description?: string, actions?: React.ReactNode): PageHeaderProps => ({
    title,
    description,
    actions,
    size: 'lg',
    layout: 'centered',
    showDivider: true
  }),

  // Minimal header with just title
  minimal: (title: string): PageHeaderProps => ({
    title,
    size: 'md',
    animate: false
  }),

  // Dashboard-style header with stats or widgets
  dashboard: (title: string, description: string, widgets: React.ReactNode): PageHeaderProps => ({
    title,
    description,
    children: widgets,
    size: 'lg',
    layout: 'split'
  }),

  // Settings page header
  settings: (title: string, description: string, saveButton: React.ReactNode): PageHeaderProps => ({
    title,
    description,
    actions: saveButton,
    size: 'md',
    layout: 'default',
    showDivider: true
  })
};

// Hook for creating dynamic headers
export const usePageHeader = () => {
  const createHeader = (title: string, options?: Partial<Omit<PageHeaderProps, 'title'>>): PageHeaderProps => ({
    title,
    ...options
  });

  const createStandardHeader = (title: string, description: string, actions?: React.ReactNode): PageHeaderProps => ({
    title,
    description,
    actions,
    size: 'lg',
    layout: 'default'
  });

  return {
    createHeader,
    createStandardHeader
  };
};

export default PageHeader;
