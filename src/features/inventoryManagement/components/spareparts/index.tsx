import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Car, ChevronRight, ClipboardList, Package, Plus, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';

import PageLoader from '@/components/loaders/pageLoader';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/dataTable';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { toastConfig } from '@/lib/toast';
import { cn } from '@/lib/utils';

import { useCreateSparePart } from '../../api/mutations/sparepartMutations';
import { useSpareParts } from '../../api/queries/sparepartsQueries';
import { CreateSparePartDTO, SparePart } from '../../types';
import { SparePartDialog } from './sparePartDialog';

export default function SparePartsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, isError } = useSpareParts();

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
          return (
            <span
              className={cn(
                'text-sm font-medium py-1 px-2 rounded-md',
                `${row.original.status ? 'bg-green-100 text-green-900' : 'bg-red-100 text-red-900'}`
              )}
            >
              {row.original.status ? 'Active' : 'Inactive'}
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
  const spareParts = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  // function to handle add spare parts
  const { mutate: createSparePart } = useCreateSparePart();
  const handleAddSpareParts = (newSpareParts: CreateSparePartDTO[]) => {
    // Handle API call here
    console.log(newSpareParts);
    createSparePart(newSpareParts, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toastConfig.success('Spare part created successfully');
      },
      onError: () => {
        setIsDialogOpen(false);
        toastConfig.error('Failed to create spare part');
      }
    });
  };

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
      title: 'Car Brands',
      value: new Set(spareParts.map((p) => p.carModel_ID)).size,
      Icon: Car,
      description: 'Compatible car brands',
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
      value: new Intl.NumberFormat('en-US').format(spareParts.length),
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
      <div className="flex items-center text-sm text-muted-foreground">
        <a href="/" className="hover:text-[#4A36EC]">
          Dashboard
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <a href="/inventory" className="hover:text-[#4A36EC]">
          Inventory
        </a>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-[#4A36EC] font-medium">Spare Parts</span>
      </div>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4A36EC]">Spare Parts</h1>
          <p className="text-sm text-gray-600">Manage spare parts and their specifications</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Spare Part
        </Button>
      </motion.div>

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

      <SparePartDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleAddSpareParts} />
    </div>
  );
}
