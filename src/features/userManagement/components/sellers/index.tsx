import { Row } from '@tanstack/react-table';
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

import { useGetSellerList } from '../../api/queries/sellers.queries';
import { CreateSellerDTO, Seller } from '../../types/sellers.types';
import { NewSellers } from './newSellers';

export default function SellersPage() {
  const { data, isLoading } = useGetSellerList();
  const sellers = useMemo(() => data?.data || [], [data?.data]);
  const columns = useMemo(
    () => [
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
      }

      // {
      //   header: 'Date Added',
      //   accessorKey: 'date_added',
      //   cell: ({ row }: { row: Row<Seller> }) => <div>{format(row.original.date_added, 'dd/MM/yyyy HH:mm:ss a')}</div>
      // }
    ],
    []
  );

  const formModal = useFormModal();
  const handleAddSeller = () => {
    formModal.openForm({
      title: 'Add New Seller',
      children: <NewSellers onSubmit={handleSubmitSeller} loading={false} />,
      showFooter: false
    });
  };

  const handleSubmitSeller = async (sellerData: CreateSellerDTO) => {
    try {
      // Handle API call here
      console.log(sellerData);
      toast.success('Seller created successfully');
      formModal.close();
    } catch {
      toast.error('Failed to create seller');
    }
  };

  const stats = [
    {
      title: 'Total Sellers',
      value: sellers.length,
      Icon: Store,
      description: 'Registered sellers',
      trend: '+3.2%',
      trendUp: true
    },
    {
      title: 'Active Locations',
      value: sellers.length,
      Icon: MapPin,
      description: 'Service locations',
      trend: '+2.1%',
      trendUp: true
    },
    {
      title: 'Assigned Gopos',
      value: new Set(sellers.map((s) => s.Gopa_ID)).size,
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
      <Breadcrumb items={BreadcrumbPatterns.threeTier('User Management', '/user-management', 'Sellers')} />

      {/* Header */}
      <PageHeader
        title="Sellers"
        description="Manage sellers and their locations"
        actions={
          <Button onClick={handleAddSeller} className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Seller
          </Button>
        }
      />

      {/* Stats Cards */}
      <CardGrid cards={stats} />

      {/* Map and Table Container */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Map */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 h-[400px] rounded-lg overflow-hidden border"
        >
          <SellerMap sellers={sellers} selectedLocation={selectedLocation} onLocationSelect={setSelectedLocation} />
        </motion.div> */}

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-4">
          <DataTable data={sellers} columns={columns} loading={isLoading} />
        </motion.div>
      </div>
    </div>
  );
}
