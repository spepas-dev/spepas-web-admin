import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Car, ClipboardList, Package, Plus, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, PageHeader } from '@/components/ui/custom';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useCreateSparePart } from '../../api/mutations/sparepartMutations';
import { useSpareParts } from '../../api/queries/sparepartsQueries';
import { CreateSparePartDTO, SparePart } from '../../types';
import { NewSpareParts } from './newSpareParts';

export default function SparePartsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createSparePartMutation = useCreateSparePart();
  const addSparePartModal = useFormModal();

  const { data, isLoading, isError } = useSpareParts();

  const spareParts = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const handleSubmitSpareParts = async (spareParts: CreateSparePartDTO[]) => {
    setIsSubmitting(true);

    try {
      await createSparePartMutation.mutateAsync(spareParts);

      toast.success(`${spareParts.length} spare part(s) created successfully`);

      addSparePartModal.close();
    } catch (error) {
      console.error('Error creating spare parts:', error);
      toast.error('Failed to create spare parts. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddSparePart = () => {
    addSparePartModal.openForm({
      title: 'Add Spare Parts',
      size: 'md',
      showFooter: false,
      children: <NewSpareParts onSubmit={handleSubmitSpareParts} loading={isSubmitting} />
    });
  };

  const columns: ColumnDef<SparePart>[] = useMemo(() => {
    return [
      {
        header: 'Name of Part',
        accessorKey: 'name'
      },
      {
        header: 'Description',
        accessorKey: 'description'
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const isActive = row.original.status === 1;
          return (
            <span
              className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                isActive ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
              )}
            >
              <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', isActive ? 'bg-green-400' : 'bg-red-400')} />
              {isActive ? 'Active' : 'Inactive'}
            </span>
          );
        }
      },
      {
        header: 'Price',
        accessorKey: 'price',
        cell: ({ row }) => {
          return <div>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GHS' }).format(row.original.price)}</div>;
        }
      },
      {
        header: 'Created At',
        accessorKey: 'createdAt',
        cell: ({ row }) => {
          return <div>{format(new Date(row.original.createdAt), 'yyyy/MM/dd HH:mm:a')}</div>;
        }
      }
    ];
  }, []);

  const stats = [
    {
      title: 'Total Parts',
      value: spareParts.length,
      Icon: Wrench,
      description: 'Active spare parts in system',
      trend: '+4.3%',
      trendUp: true
    },
    {
      title: 'Car Models',
      value: new Set(spareParts.map((p: SparePart) => p.carModel_ID)).size,
      Icon: Car,
      description: 'Compatible car models',
      trend: '+2.7%',
      trendUp: true
    },
    {
      title: 'Categories',
      value: 12,
      Icon: ClipboardList,
      description: 'Part categories',
      trend: '+1.5%',
      trendUp: true
    },
    {
      title: 'In Stock',
      value: spareParts.length,
      Icon: Package,
      description: 'Available inventory',
      trend: '-0.8%',
      trendUp: false
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
    return <div>Error loading spare parts</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('Inventory', '/inventory', 'Spare Parts')} />

      {/* Header */}
      <PageHeader
        title="Spare Parts"
        description="Manage spare parts and their specifications"
        actions={
          <Button onClick={handleAddSparePart} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Spare Part
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          columns={columns}
          data={spareParts}
          placeholder="Search spare parts..."
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
