import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Car, ChevronRight, Factory, Globe, Plus, Settings } from 'lucide-react';
import { useMemo, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { useFormModal } from '@/components/ui/custom/modals';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { toastConfig } from '@/lib/toast';
import { cn } from '@/lib/utils';

import { useCreateManufacturer } from '../../api/mutations/manufacturerMutations';
import { useManufactures } from '../../api/queries/manufacturesQueries';
import { CreateManufacturerDTO, Manufacturer } from '../../types';
import { ManufacturerDialog } from './manufacturerDialog';

export default function ManufacturersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, isError } = useManufactures();

  const { mutate: createManufacturer } = useCreateManufacturer();

  const manufacturers = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const columns: ColumnDef<Manufacturer>[] = useMemo(() => {
    return [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Country',
        accessorKey: 'country'
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
        header: 'Created On',
        accessorKey: 'createdAt',
        cell: ({ row }) => {
          return <span>{format(new Date(row.original.createdAt), 'yyyy/MM/dd HH:mm:a')}</span>;
        }
      }
    ];
  }, []);

  const handleAddManufacturers = (newManufacturers: CreateManufacturerDTO[]) => {
    // Handle API call here
    console.log(newManufacturers);
    createManufacturer(newManufacturers, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toastConfig.success('Manufacturer created successfully');
      },
      onError: () => {
        toastConfig.error('Failed to create manufacturer');
      }
    });
  };

  const addManufacturerModal = useFormModal();

  const handleAddManufacturer = () => {
    addManufacturerModal.openForm({
      title: 'Add Manufacturer',
      size: 'md',
      children: (
        <>
          <p>Add a new manufacturer to the system</p>
        </>
      ),
      onSubmit: () => {
        console.log('yes');
      }
    });
  };

  const stats = [
    {
      title: 'Total Manufacturers',
      value: manufacturers.length,
      Icon: Factory,
      description: 'Active manufacturers in the system',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Countries',
      value: new Set(manufacturers.map((m) => m.country)).size,
      Icon: Globe,
      description: 'Countries represented',
      trend: '+1.2%',
      trendUp: true
    },
    {
      title: 'Vehicle Models',
      value: 234,
      Icon: Car,
      description: 'Associated vehicle models',
      trend: '+5.4%',
      trendUp: true
    },
    {
      title: 'Parts Categories',
      value: 56,
      Icon: Settings,
      description: 'Available part categories',
      trend: '+3.1%',
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
    return <div>Error loading manufacturers</div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/inventory" className="hover:text-[#4A36EC]">
          Inventory
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Manufacturers</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Manufacturers</h1>
          <p className="text-sm text-gray-600">Manage car manufacturers in the system</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Manufacturer
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          columns={columns}
          data={manufacturers}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>

      <ManufacturerDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddManufacturers} />
    </div>
  );
}
