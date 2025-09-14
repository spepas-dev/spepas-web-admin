import { motion } from 'framer-motion';
import { Plus, Tag } from 'lucide-react';
import React, { useMemo, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui';
import Breadcrumb, { BreadcrumbPatterns } from '@/components/ui/custom/breadcrumb';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import PageHeader from '@/components/ui/custom/pageHeader';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { toastConfig } from '@/lib/toast';

import { useCreateCategory } from '../../api/mutations/categoryMutations';
import { useCategories } from '../../api/queries/categoryQueries';
import { CreateCategoryDTO } from '../../types';
import NewCategories from './newCategories';

function CategoriesPage() {
  const addCategoryModal = useFormModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCategoryMutation = useCreateCategory();
  const { data: categoriesData, isLoading, isError } = useCategories();
  const categories = useMemo(() => {
    return categoriesData?.data || [];
  }, [categoriesData?.data]);

  console.log(categories);

  const columns = useMemo(() => {
    return [
      {
        header: 'Name',
        accessorKey: 'name'
      }
    ];
  }, []);
  const handleSubmitCategories = async (categories: CreateCategoryDTO[]) => {
    setIsSubmitting(true);
    try {
      await createCategoryMutation.mutateAsync(categories);
      toastConfig.success('Categories created successfully');
      addCategoryModal.close();
    } catch (error) {
      console.error('Error creating categories:', error);
      toastConfig.error('Failed to create categories. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = () => {
    addCategoryModal.openForm({
      title: 'Add Category',
      size: 'md',
      showFooter: false,
      children: <NewCategories onSubmit={handleSubmitCategories} loading={isSubmitting} />
    });
  };

  const stats = [
    {
      title: 'Total Categories',
      value: 0,
      Icon: Tag,
      description: 'Active categories',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Car Models Categories',
      value: 0,
      Icon: Tag,
      description: 'Active categories',
      trend: '+1.5%',
      trendUp: true
    },
    {
      title: 'Spare Parts Categories',
      value: 0,
      Icon: Tag,
      description: 'Spare parts categories',
      trend: '+3.5%',
      trendUp: true
    }
  ];

  if (isLoading) {
    return (
      <div className="p-8 space-y-8">
        <PageLoader />
      </div>
    );
  }
  if (isError) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Inventory', '/inventory', 'Categories')} />

      {/* Header */}
      <PageHeader
        title="Categories"
        description="Manage categories and their specifications"
        actions={
          <Button onClick={handleAddCategory} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          columns={columns}
          data={categories}
          placeholder="Search categories..."
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}

export default CategoriesPage;
