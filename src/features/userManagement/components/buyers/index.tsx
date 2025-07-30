import { ColumnDef, Row } from '@tanstack/react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { MapPin, Plus, ShoppingBag, Store, Users } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbPatterns, DataTable, PageHeader } from '@/components/ui/custom';
import { useFormModal } from '@/components/ui/custom/modals';
import { CardGrid } from '@/components/ui/custom/staticCards';
import { cn } from '@/lib/utils';

import { useGetBuyerList } from '../../api/queries/buyer.queries';
import { Buyer, CreateBuyerDTO } from '../../types/buyer.types';
import { Mepa } from '../../types/mechanics.types';
import { NewBuyers } from './newBuyers';

export default function BuyersPage() {
  const { data, isLoading } = useGetBuyerList();
  const buyers = useMemo(() => data?.data || [], [data?.data]);

  const formModal = useFormModal();

  const columns = useMemo(
    (): ColumnDef<Buyer>[] => [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Email',
        accessorKey: 'email'
      },
      {
        header: 'Phone',
        accessorKey: 'phoneNumber'
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
        header: 'Date Added',
        accessorKey: 'createdAt',
        cell: ({ row }: { row: Row<Buyer> }) => <div>{format(row.original.createdAt, 'dd/MM/yyyy HH:mm:ss a')}</div>
      }
    ],
    []
  );

  const handleAddBuyer = () => {
    formModal.openForm({
      title: 'Add New Buyer',
      children: <NewBuyers onSubmit={handleSubmitBuyer} loading={false} />,
      showFooter: false
    });
  };

  const handleSubmitBuyer = async (buyerData: CreateBuyerDTO) => {
    try {
      // Handle API call here
      console.log(buyerData);
      toast.success('Buyer created successfully');
      formModal.close();
    } catch {
      toast.error('Failed to create buyer');
    }
  };

  const stats = [
    {
      title: 'Total Buyers',
      value: buyers.length,
      Icon: Store,
      description: 'Registered buyers',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Active Locations',
      value: buyers.length,
      Icon: MapPin,
      description: 'Service locations',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Assigned Gopos',
      value: new Set(buyers.map((b) => b.Gopa_ID)).size,
      Icon: Users,
      description: 'Active Gopos',
      trend: '+1.5%',
      trendUp: true
    },
    {
      title: 'Total Products',
      value: 156,
      Icon: ShoppingBag,
      description: 'Listed products',
      trend: '+4.3%',
      trendUp: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumb items={BreadcrumbPatterns.threeTier('User Management', '/user-management', 'Buyers')} />

      {/* Header */}
      <PageHeader
        title="Buyers"
        description="Manage buyers and their locations"
        actions={
          <Button onClick={handleAddBuyer} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Buyer
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <DataTable
          data={buyers}
          columns={columns}
          loading={isLoading}
          tableStyle="border rounded-lg bg-white"
          tableHeadClassName="text-[#4A36EC] font-semibold"
        />
      </motion.div>
    </div>
  );
}
